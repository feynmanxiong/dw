<template>
    <div>
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
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleDialogCloseSon" size="small">取 消</el-button>
            <el-button type="primary" @click="handleDialogCommitSon" size="small">确 定</el-button>
        </span>
    </div>
</template>
<script>
export default {
    props:["DataSon"],
    data(){
        return{
            PortDataSon:[],
            title:"",
            businessModule:this.$store.state.businessModule,//业务板块List数据
            MBusinessClass:[//主业务类型List
            ],
            SBusinessClass:[//子业务类型List
            ],
            newid:1,////港口业务板块类型关系编辑弹框新增数据 模拟id(自增)
        }
    },
    created(){
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
        console.log(this.DataSon)
    },
    methods:{
        handleDialogCloseSon(){
            this.innerVisibleSon=false;
        },
        handleDialogCommitSon(){},
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

</style>