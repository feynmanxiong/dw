import { Message, Loading  } from 'element-ui';
import {mapState,mapAction} from 'vuex';

function install(Vue) {
    Vue.mixin({
        created: function () {
        },
        data(){
            return {
            }
        },
        updated() {
        }
    })

    Vue.prototype.$login = function (param) {
        var _this=this;
        axios.post('/login',param).then((response) => {
            if (response.data.code == 200) {
                // localStorage.setItem("dw_erp_user_name",response.data.data.name);
                // localStorage.setItem("dw_erp_user_username",response.data.data.username);
                // localStorage.setItem("dw_erp_user_token",response.data.data.token);
                localStorage.setItem("dw_erp_user_name",response.data.data.name);
                //localStorage.setItem("dw_erp_user_username",response.data.data.username);
                localStorage.setItem("dw_erp_user_token",response.data.data.api_token);
                _this.$router.replace("/console");
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    Vue.prototype.$logout = function () {
        localStorage.removeItem("dw_erp_user_name");
        localStorage.removeItem("dw_erp_user_username");
        localStorage.removeItem("dw_erp_user_token");
        this.$router.replace("/login");
    }

    // Vue.prototype.$getOss = function(code,oss,upload_data){
    //     let self = this;
    //     return new Promise((resolve, reject) =>{
    //         axios.post("https://cloud-api-dev.jnqueqiao.com/tool/v1/oss.policy.get",{
    //             operate_code : code
    //         }).then((response) => {
    //             if(response.data.code == 0){
    //                 oss = response.data.data;
    //                 upload_data = {
    //                     name: self.file.name,
    //                     key : self.oss.dir + "${filename}",
    //                     policy : self.oss.policy,
    //                     OSSAccessKeyId : self.oss.accessid,
    //                     success_action_status : "200",
    //                     callback : self.oss.callback,
    //                     signature : self.oss.signature,
    //                     'Cache-Control' : self.oss.cache_control,
    //                 }
    //                 resolve();
    //             }
    //         }).catch((error)=>{
    //             reject();
    //         })
    //     })
    // }
    Vue.prototype.$checkingOpetate = {};
    Vue.prototype.$canOperate = function () {
        Vue.prototype.$checkingOpetate = Loading.service({ fullscreen: true, lock: true, text:"正在同步ERP数据请稍后···" });
        return new Promise((resolve, reject) => {
            axios.post("/goods.can.operate").then((response) => {
                if(response.data.code == 0){
                    resolve(response.data.data.operate);
                }
            }).catch((error) => {
                reject();
                console.log(error);
            })
        })
    }

    Vue.prototype.$checkOpetate = function () {
        Vue.prototype.$canOperate().then((operate) => {
            if(operate == 1){
                Vue.prototype.$checkingOpetate.close();
            } else {
                setTimeout(() => {
                    Vue.prototype.$checkOpetate();
                },1000);
            }
        })
    }

    Vue.prototype.$getBreed = function(){
        return axios.post("/breed.port");
    }
    Vue.prototype.$getBrand = function(){
        return axios.post("/brand.lst");
    }
    Vue.prototype.$getGrade = function(){
        return axios.post("/grade.lst",{
            status : 1
        });
    }
    Vue.prototype.$gethouse = function(){
        return axios.post("/warehouse.port")
    }
    Vue.prototype.$getPortList = function(){
        return axios.post("/port.port",{
            company : "true"
        });
    }
    Vue.prototype.$getCurrencyList = function(){
        return axios.post("/currency.lst");
    }

    Vue.prototype.$getAdminList = function(){
        return axios.post("/admin.port");
    }

    //laughing

    Vue.prototype.$getFunc=function(url,data,success,errorF){
        axios.get(url,data).then(response=>{
            if(response.status==200&&response.data.code==200){
                success(response)
            }
        }).catch(error=>{
            errorF(error)
        })
    }
    //post请求不带message提示
    Vue.prototype.$postFunc=function(url,data,success,errorF){
        axios.post(url,data).then(response=>{
            if(response.status==200&&response.data.code==200){
                success(response)
            }else{
                console.log(response)
            }
        }).catch(error=>{
            errorF(error)
        })
    }
    //post请求带message提示
    Vue.prototype.$postHasMessageFunc=function(url,data,success,errorF){
        axios.post(url,data).then(response=>{
            if(response.status==200&&response.data.code==200){
                success(response)
                this.$messageTip('成功','success');
            }else{
                console.log(response)
                this.$messageTip(response.data.message,'error');
            }
        }).catch(error=>{
            errorF(error)
            this.$messageTip(response.data.message,'error');
        })
    }
    //message提示
    Vue.prototype.$messageTip=function(message,type){
        this.$message({
            message: message,
            type: type,
            duration:2000
        });
    }
    //获取主业务模块3级联动 一级为0  二三级为上级id
    Vue.prototype.$getBusinessModule=function(id,otherid){
        return new Promise((resolve, reject) => {     
            this.$getFunc("/businesses/list/result",{params:{parent_id:id}},function(response){
                resolve(response.data.data,otherid)
            },function(){
    
            })                                           
        })
    }
    //修改时获取修改模块id
    Vue.prototype.$getEditMessageId=function(id,func){
        this.$store.dispatch("changeFunc",id)
        func();
    }
    //基础模块批量删除
    Vue.prototype.$batchDelete=function(dataList,url,func){
        if(dataList.length>0){
            this.$confirm("是否确定删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            })
            .then(() => {
                var ids="";
                dataList.forEach(item=>{
                    ids+=item.id+",";
                })
                ids=ids.substring(0,ids.length-1);
                this.$postHasMessageFunc(url,{ids:ids},function(res){
                    func(res);
                },function(){})
            }).catch(()=>{})
        }else{
            this.$messageTip('error','请选择删除的数据');
        }
    }
    //基础模块批量启用
    Vue.prototype.$batchEnable=function(dataList,url,func){
        if(dataList.length>0){
            this.$confirm("是否确定启用？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            })
            .then(() => {
                var ids="";
                dataList.forEach(item=>{
                    ids+=item.id+",";
                })
                ids=ids.substring(0,ids.length-1);
                this.$postHasMessageFunc(url,{ids:ids,status:1},function(res){
                    func(res)
                },function(){})
            }).catch(()=>{})
        }else{
            this.$messageTip('error','请选择启用的数据');
        }
    }
    //基础模块批量禁用
    Vue.prototype.$batchProhibit=function(dataList,url,func){
        console.log(dataList)
        console.log(url)
        if(dataList.length>0){
            this.$confirm("是否确定禁用？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            })
            .then(() => {
                var ids="";
                dataList.forEach(item=>{
                    ids+=item.id+",";
                })
                ids=ids.substring(0,ids.length-1);
                this.$postHasMessageFunc(url,{ids:ids,status:0},function(res){
                    console.log(res)
                    func(res)
                },function(){})
            }).catch(()=>{})
        }else{
            this.$messageTip('error','请选择禁用的数据');
        }
    }
}

export default install;
