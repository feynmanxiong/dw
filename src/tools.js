import { Message, Loading  } from 'element-ui';


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
            console.log(response)
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
    //json迭代
    Vue.prototype.$getJsonFunc=function(json){
        let data="";
        for(let i in json){
            data+=i+"="+json[i]+"&";
        }
        return data
    }

    Vue.prototype.$getFunc=function(url,data,success,errorF){
        axios.get(url,data).then(response=>{
            if(response.status==200&&response.data.code==200){
                success(response)
            }
        }).catch(error=>{
            errorF(error)
        })
    }
    Vue.prototype.$postFunc=function(url,data,success,errorF){
        axios.post(url,data).then(response=>{
            if(response.status==200&&response.data.code==200){
                success(response)
            }else{
                
            }
        }).catch(error=>{
            errorF(error)
        })
    }
}

export default install;
