<template>
    <div>
        <div class="STable">
            <div class="STableTitle clearfix">
                <span>{{checkPort}}</span>
                <el-button plain class="STableTitle_btn" type="primary" size="small" @click="editTableSon">编辑</el-button>
            </div>
                <template>
                <el-table :data="PortData" border size="mini" :header-cell-style="{background:'#e0f4ff',color:'#000'}">
                    <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" prop="segment_business_name" label="业务模块"></el-table-column>
                    <el-table-column align="center" prop="master_business_name" label="主业务类型"></el-table-column>
                    <el-table-column align="center" prop="slaver_business_name" label="子业务类型"></el-table-column>
                    <el-table-column align="center" prop="user_name" label="操作人"></el-table-column>
                    <el-table-column align="center" prop="updated_at" label="操作时间"></el-table-column>
                </el-table>
            </template>
        </div>
        <el-dialog :title="checkPort" :visible.sync="innerVisibleSon" width="70%" :append-to-body="true" :modal="true" :before-close="handleDialogCloseSon">
            <el-table :data="PortDataSon" :header-cell-style="{background:'#e0f4ff',color:'#000'}" border size="mini" class="PortDataSon"  style="margin-bottom:10px;">
                <el-table-column align="center" prop="id" label="操作" width="80">
                    <template slot-scope="scope">
                        <i class="fa fa-plus" aria-hidden="true" @click="PortDataSonCopy(scope.row.id)"></i>
                        <i class="fa fa-trash" aria-hidden="true" @click="PortDataSonDelete(scope.row.id)"></i>
                    </template>
                </el-table-column>
                <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
                <el-table-column align="center" prop="segment_business_id" label="业务板块">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.segment_business_id" @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"  placeholder="请选择" class="selectInTable">
                            <el-option v-for="item in businessModule" :label="item.name" :key="item.id" :value="item.id"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="master_business_id" label="主业务类型">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.master_business_id" @change="MBusinessClassChange(scope.row.master_business_id,scope.row.id)" placeholder="请选择" class="selectInTable">
                            <el-option v-for="item in PortDataSon[scope.$index].master_business_list" :label="item.name" :key="item.id" :value="item.id"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="slaver_business_id" label="子业务类型">
                    <template slot-scope="scope"> 
                        <el-select v-model="scope.row.slaver_business_id" placeholder="请选择" class="selectInTable">
                            <el-option v-for="item in PortDataSon[scope.$index].slaver_business_list" :label="item.name" :key="item.id" :value="item.id"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer clearfix">
                <div class="footBox">
                    <el-button @click="handleDialogCloseSon" size="small">取 消</el-button>
                    <el-button type="primary" @click="handleDialogCommitSon" size="small">确 定</el-button>
                </div>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            submitUrl:"",//表格编辑确定地址
            url:"",//列表获取地址
            innerVisibleSon:false,//港口维护子表添加弹框是否显示，
            innerVisibleType:true,//港口维护主表添加弹框是添加还是删除状态  添加:true  删除:false
            sonTableIsShow:false,//港口业务板块类型关系编辑是否展示 是true  否false
            PortDataSon:[],
            businessModule:this.$store.state.businessModule,//业务板块List数据
            checkPort:"",//港口业务板块类型关系    港口{{checkPort}}数据展示
            chekcPortId:"",//港口业务板块类型关系id
            MBusinessClass:[//主业务类型List
            ],
            SBusinessClass:[//子业务类型List
            ],
            newid:1,////港口业务板块类型关系编辑弹框新增数据 模拟id(自增)
            PortDataSon:[//港口业务板块类型关系编辑 数据
                // {
                // 	id:"N0",
                // 	segment_business_id:null,
                // 	segment_business_list:[],
                // 	master_business_id:null,
                // 	master_business_list:[],
                // 	slaver_business_id:null,
                // 	slaver_business_list:[]
                // }
            ],
            PortData:[//港口业务板块类型关系  数据
                // {businessMoudle:"龙达",MBusinessClass:"龙达集团",SBusinessClass:"启用",operator:"person",time:"2019-09-19"},
                // {businessMoudle:"龙达",MBusinessClass:"龙达集团",SBusinessClass:"启用",operator:"person",time:"2019-09-19"},
                // {businessMoudle:"龙达",MBusinessClass:"龙达集团",SBusinessClass:"启用",operator:"person",time:"2019-09-19"},
                // {businessMoudle:"龙达",MBusinessClass:"龙达集团",SBusinessClass:"启用",operator:"person",time:"2019-09-19"}
            ]
        }
    },
    watch:{
        // DataSon(val,oldval){
        //     this.PortDataSon=val;
        //     console.log(this.PortDataSon)
        // }
    },
    // computed:{
    //     dataChange(){
    //         return this.PortDataSon
    //     }
    // },
    created(){
       
    },
    methods:{
        //获取tr的表格数据
			getTRMessage(message){
                this.checkPort=message.name;
                this.chekcPortId=message.trid;
                this.submitUrl=message.submitUrl;
                this.url=message.url;
                var _this=this;
				_this.$postFunc(message.url,{},function(res){
					var data=res.data.data;
                    var dataT=new Array();
					data.forEach(item=>{
						item.id="N"+_this.newid;
						_this.newid++;
						var obj=new Object();
						obj.master_business_name=item.master_business_name;
						obj.segment_business_name=item.segment_business_name;
						obj.slaver_business_name=item.slaver_business_name;
						obj.user_name=item.user_name;
						obj.updated_at=item.updated_at;
						dataT.push(obj)
					})
					_this.PortDataSon=data;
					_this.PortData=dataT;
				},function(r){
					console.log(r)
				})
			},
        //子表格点击编辑
        editTableSon(){
            this.innerVisibleSon=true;
            if(this.PortDataSon.length<=0){
                var obj={	
                        id:"N0",
                        segment_business_id:null,
                        segment_business_name:"",
                        segment_business_list:[],
                        master_business_id:null,
                        master_business_name:"",
                        master_business_list:[],
                        slaver_business_id:null,
                        slaver_business_name:"",
                        slaver_business_list:[]
                    }
                this.PortDataSon.push(obj)
            }
                
        },
        handleDialogCloseSon(){
            this.innerVisibleSon=false;
            //this.$emit("closeTable")
        },
        handleDialogCommitSon(){
            var list=new Array();
            var _this=this;
            for(let i=0;i<_this.PortDataSon.length;i++){
                let datas=_this.PortDataSon[i];
                let datasNext=_this.PortDataSon[i+1];
                var obj=new Object();
                if(datas.segment_business_id==null||datas.master_business_id==null||datas.slaver_business_id==null){
                    _this.$message({
                        message:"请完善选择数据",
                        type:"warning"
                    })
                    return;
                }
                if(i<_this.PortDataSon.length&&datasNext!=undefined){
                    if(datas.segment_business_id==datasNext.segment_business_id){
                        if(datas.master_business_id==datasNext.master_business_id){
                            if(datas.slaver_business_id==datasNext.slaver_business_id){
                                _this.$message({
                                    message:"业务板块类型不能选择重复",
                                    type:"warning"
                                })
                                return;
                            }
                        }
                    }
                }
                obj.segment_business_id=datas.segment_business_id;
                obj.master_business_id=datas.master_business_id;
                obj.slaver_business_id=datas.slaver_business_id;
                list.push(obj)
            }
            _this.$postHasMessageFunc(_this.submitUrl,list,function(res){
                var obj=new Object();
                obj.checkPort=_this.checkPort;
                obj.chekcPortId=_this.chekcPortId;
                obj.submitUrl=_this.submitUrl;
                obj.url=_this.url;
                _this.getTRMessage(obj)
                _this.innerVisibleSon=false;
            },function(){})
        },
        PortDataSonCopy(id){
            this.PortDataSon.forEach((item,index)=>{
                if(item.id==id){
                    let data=JSON.parse(JSON.stringify(this.PortDataSon[index]));
                    data.id="N"+this.newid;
                    this.newid++;
                    this.PortDataSon.push(data);
                }
            })
        },
        PortDataSonDelete(id){
            this.$confirm("是否确认删除？","提示",{
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(()=>{
                this.PortDataSon.forEach((item,index)=>{
                    if(item.id==id){
                        this.PortDataSon.splice(index,1)
                    }
                })
            }).catch(()=>{
                
            })
        },
        //主业务类型列表change事件
        businessModuleChange(id,listid){
            var _this=this;
            _this.$getBusinessModule(id).then((item)=>{
                _this.PortDataSon.forEach((each,index)=>{
                    if(each.id==listid){
                        _this.PortDataSon[index].master_business_list=item;
                    }
                })
            })
        },
        //子业务板块列表change事件
        MBusinessClassChange(id,listid){
            var _this=this;
            _this.$getBusinessModule(id).then((item)=>{
                _this.PortDataSon.forEach((each,index)=>{
                    if(each.id==listid){
                        _this.PortDataSon[index].slaver_business_list=item;
                    }
                })
            })
        }
    }
}
</script>
<style scoped>
    .dialog-footer{width:100%;}
    .footBox{float: right;}
    .STableTitle_btn{float: right;margin-bottom:0;}
</style>