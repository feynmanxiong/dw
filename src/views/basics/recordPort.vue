<!--基础资料=>业务基础数据=>港口维护   recordPort -->
<template>
	<div>
		<div class="container">
			
		</div>
		<el-container :class="['elContianer',isShowAside?'':'contain_box_in']">
			<transition name = "select_out">
				<div class="select_out"  v-show="!isShowAside" @click="isShowAside=true">
					<i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
				</div>
			</transition>
			<transition name = "select_in" >
				<el-aside width="320px"  v-show="isShowAside" class="select_box">
					<div class="select_in" @click="isShowAside=false">
						<i class="el-submenu__icon-arrow el-icon-arrow-left"></i>
					</div>
					<div class="cont_t">自定义查询区</div>
					<el-row class="el-m publicSelect">
						<div align="center">					
							<el-button type="info" plain size="mini" @click="reset">重置</el-button>
							<el-button type="success" plain size="mini" @click="select">查询</el-button>
						</div>
					</el-row>
					<!-- <el-row>
						<input type="text" v-model="getKeyList.search" placeholder="请输入内容" class="el-input__inner">
					</el-row> -->
					<el-row>
						<span class="span">状态</span>
						<el-select v-model="getKeyList.status" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">港口</span>
						<div class="block">
							<el-select v-model="getKeyList.id" filterable placeholder="请选择" size="mini" class="date_box">
								<el-option v-for="item in Port" :key="item.key" :label="item.value" :value="item.key"> </el-option>
							</el-select>
						</div>			
					</el-row>
					<el-row>
						<span class="span">国家</span>
						<div class="block">
							<el-select v-model="getKeyList.country" placeholder="请选择" size="mini" class="date_box">
								<el-option v-for="item in countryList" :key="item.value" :label="item.key" :value="item.value"> </el-option>
							</el-select>
						</div>			
					</el-row>
					<el-row>
						<span class="span">业务板块</span>
						<div class="block">
							<el-select @change="bussinessMouble" v-model="getKeyList.segment_business_id" placeholder="请选择" size="mini" class="date_box">
								<el-option v-for="item in businessModule" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
						</div>			
					</el-row>
					<el-row>
						<span class="span">主业务类型</span>
						<div class="block">
							<el-select @change="MBussinessClassFunc" v-model="getKeyList.master_business_id" placeholder="请选择" size="mini" class="date_box">
								<el-option v-for="item in MBusinessClass" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
						</div>			
					</el-row>
					<el-row>
						<span class="span">子业务类型</span>
						<div class="block">
							<el-select v-model="getKeyList.slaver_business_id" placeholder="请选择" size="mini" class="date_box">
								<el-option v-for="item in SBusinessClass" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
						</div>			
					</el-row>
				</el-aside>
			</transition>
			<el-main>
				<el-row class="cont_block">
					<el-button type="primary" plain @click="innerVisible=true;innerVisibleType=true;" size="mini">新增</el-button>
					<!-- <el-button type="primary" plain @click="handleChange"  size="mini">修改</el-button> -->
					<el-button size="mini" plain  type="danger" @click="handleDelete">删除</el-button>
					<el-button size="mini" plain  type="primary" @click="handleStart">启用</el-button>
                    <el-button size="mini" plain  type="danger" @click="handleProhibit">禁用</el-button>
				</el-row>
				<el-row>
					<el-table  :data="tableData" :header-cell-style="{background:'#e0f4ff',color:'#000'}" border class="mainTable" size="mini" @selection-change="MainTableSelectChange" @row-click="mainTableTrClick">
						<el-table-column type="selection" prop="id" align="center" width="55"></el-table-column>
						<el-table-column align="center" type="index" label="编辑" prop="id" width="80">
							<template slot-scope="scope">
								<i class="fa fa-edit" aria-hidden="true" @click.stop="mainTableEdit(scope.row.id)"></i>
								<i class="fa fa-trash" aria-hidden="true" @click.stop="mainTableSingleDelete(scope.row.id)"></i>
							</template>
						</el-table-column>
						<el-table-column align="center" prop="status" :sortable="true" label="状态">
							<template slot-scope="scope">{{scope.row.status==1?"启用":"禁用"}}</template>
						</el-table-column>
						<el-table-column align="center" prop="name_code" :sortable="true" label="助记码"></el-table-column>
						<el-table-column align="center" prop="name" :sortable="true" label="港口"></el-table-column>
						<el-table-column align="center" prop="country" :sortable="true" label="国家"></el-table-column>
						<el-table-column align="center" prop="user_name" :sortable="true" label="操作人"></el-table-column>
						<el-table-column align="center" prop="updated_at" :sortable="true" label="操作时间"></el-table-column>
					</el-table>
					<el-pagination background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="getKeyList.page"
						:page-sizes="[10, 50, 100, 200]"
						:page-size="getKeyList.per_page"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total">
					</el-pagination>
				</el-row>
				<div class="STable" v-show="sonTableIsShow">
					<businessmodule ref="publicbussinessmodule" @getTrMessage="getTRMessage"></businessmodule>
				</div>

				<!-- <div class="STable" v-show="sonTableIsShow">
					<div class="STableTitle clearfix">
						<span>港口业务板块类型关系 &nbsp;&nbsp;&nbsp;港口：{{checkPort}}</span>
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
				</div> -->
			</el-main>
			<!--港口维护主表添加start-->
			<el-dialog title="新建港口" :visible.sync="innerVisible" :append-to-body="true" :modal="true" :before-close="handleDialogClose">
				<el-form ref="buildSettlementCompany" :rules="rules" :model="buildSettlementCompany"  label-width="80px"  size="small">
					<el-form-item label="助记码" prop="name_code">
						<el-input v-model="buildSettlementCompany.name_code"></el-input>
					</el-form-item>
					<el-form-item label="国家" prop="country">
						<el-input v-model="buildSettlementCompany.country"></el-input>
					</el-form-item>
					<el-form-item label="港口" prop="name">
						<el-input v-model="buildSettlementCompany.name"></el-input>
					</el-form-item>
					<el-form-item label="状态" prop="status">
						<el-select v-model="buildSettlementCompany.status" placeholder="请选择状态">
							<el-option label="启用" :value="1"></el-option>
							<el-option label="禁用" :value="0"></el-option>
						</el-select>
					</el-form-item>
					 <el-form-item size="small">
						<el-button type="primary" @click="onSubmit">{{innerVisibleType?"添加":"保存"}}</el-button>
						<el-button @click="handleDialogClose">取消</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
			<!--港口维护主表添加end-->
			<!--港口维护子表添加start-->
			<!-- <el-dialog :title="'港口业务板块类型关系 港口：'+checkPort" :visible.sync="innerVisibleSon" width="70%" :append-to-body="true" :modal="true" :before-close="handleDialogCloseSon">
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
			</el-dialog> -->
			<!--港口维护子表添加end-->
		</el-container>
	</div>
</template>

<script>
	import businessModule from '../public/businessModule.vue'
	export default {
		data() {
			return {

				getKeyList:{
					page:1,//第几页，默认第一页
					per_page:10,//每页记录数，默认是10
					search:"",//模糊搜索
					status:"",//状态0:禁用，1:启用
					id:"",//港口id
					country:"",//国家
					user_id:"",//操作人
					segment_business_id:"",//主业务板块
					master_business_id:"",//主业务类型
					slaver_business_id:""//子业务类型
				},
				isShowAside:true,//是否展示侧边栏
				innerVisible:false,//港口维护主表添加弹框是否显示
				// innerVisibleSon:false,//港口维护子表添加弹框是否显示，
				innerVisibleType:true,//港口维护主表添加弹框是添加还是删除状态  添加:true  删除:false
				sonTableIsShow:false,//港口业务板块类型关系编辑是否展示 是true  否false
				countryList:[],//国家列表
				Port:[],//港口列表
				businessModule:this.$store.state.businessModule,//业务板块List数据
				MBusinessClass:[//主业务类型List
				],
				SBusinessClass:[//子业务类型List
				],
				MainTableSelectChangeIdList:[],//列表页多选框，选中的id
				// checkPort:"",//港口业务板块类型关系    港口{{checkPort}}数据展示
				// chekcPortId:"",//港口业务板块类型关系id
				//newid:1,////港口业务板块类型关系编辑弹框新增数据 模拟id(自增)
				fileList:"",
				params:"",
				total: 7,
                currentPage: 1,
　　　　　　　　　pageSize: 10,
				radio:'1',
				buildSettlementCompany:{//新增修改弹框数据
					name:"",//港口名称
					name_code:"",//港口助记码
					country:"",//国家
					status:""//状态
				},
				// PortDataSon:[//港口业务板块类型关系编辑 数据
				// 	// {
				// 	// 	id:"N0",
				// 	// 	segment_business_id:null,
				// 	// 	segment_business_list:[],
				// 	// 	master_business_id:null,
				// 	// 	master_business_list:[],
				// 	// 	slaver_business_id:null,
				// 	// 	slaver_business_list:[]
				// 	// }
				// ],
				rules: {
					name_code: [
						{ required: true, message: '请输入助记码', trigger: 'blur' },
					],
					country: [
						{required: true, message: '请输入国家', trigger: 'blur'  }
					],
					name: [
						{ required: true, message: '请输入港口', trigger: 'blur' }
					],
					status: [
						{required: true, message: '请选择状态',  trigger: 'change' }
					]
				},
				tableData: [//列表数据
					
				],
				// PortData:[//港口业务板块类型关系  数据
				// 	// {businessMoudle:"龙达",MBusinessClass:"龙达集团",SBusinessClass:"启用",operator:"person",time:"2019-09-19"},
				// 	// {businessMoudle:"龙达",MBusinessClass:"龙达集团",SBusinessClass:"启用",operator:"person",time:"2019-09-19"},
				// 	// {businessMoudle:"龙达",MBusinessClass:"龙达集团",SBusinessClass:"启用",operator:"person",time:"2019-09-19"},
				// 	// {businessMoudle:"龙达",MBusinessClass:"龙达集团",SBusinessClass:"启用",operator:"person",time:"2019-09-19"}
				// ]
				
			}
		},
		computed: {},
		created() {
			this.getMessage();
		},
		mounted() {},
		components:{
			businessmodule:businessModule
		},
		methods: {
			//查询按钮
			select(){
				this.getMessage()
				this.sonTableIsShow=false;
			},
			//重置按钮
			reset(){
				this.getKeyList={page:1,per_page:10,search:"",status:"",id:"",country:"",user_id:"",segment_business_id:"",master_business_id:"",slaver_business_id:""}
				this.getMessage()
				this.sonTableIsShow=false;
			},
			//主业务类型change事件
			MBussinessClassFunc(){
				this.$getBusinessModule(this.getKeyList.master_business_id).then(item=>{
					this.SBusinessClass=item;
				});
			},
			//业务板块change事件
			bussinessMouble(){
				this.$getBusinessModule(this.getKeyList.segment_business_id).then(item=>{
					this.MBusinessClass=item;
				});
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
			},
			//获取数据
			getMessage(){
				var _this=this;
				this.$postFunc("/ports/list",this.getKeyList,function(respones){
					_this.tableData=respones.data.data.result;
					_this.countryList=respones.data.data.country;
					_this.Port=respones.data.data.name;
					_this.total=respones.data.data.total;
				},function(){

				})
			},
			//主表格单条修改
			mainTableEdit(id){
				this.tableData.forEach((it,index)=>{
					if(id==it.id){
						this.buildSettlementCompany=JSON.parse(JSON.stringify(it));
						this.innerVisibleType=false;
						this.innerVisible=true;
					}
				})
			},
			//主表格单条删除
			mainTableSingleDelete(id){
				this.$confirm("是否确定删除？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消"
				})
				.then(() => {
					var _this=this;
					_this.$postHasMessageFunc("/ports/destroy",{ids:id},function(res){
						_this.tableData.forEach((it,index)=>{
							if(id==it.id){
								_this.tableData.splice(index,1)
							}
						})
					},function(){})
				}).catch(()=>{})
			},
			//获取tr的表格数据
			getTRMessage(trid,name){
				// var _this=this;
				// _this.$postFunc("/ports/show/business/"+trid,{},function(res){
				// 	var data=res.data.data;
				// 	var dataT=new Array();
				// 	data.forEach(item=>{
				// 		item.id="N"+_this.newid;
				// 		_this.newid++;
				// 		var obj=new Object();
				// 		obj.master_business_name=item.master_business_name;
				// 		obj.segment_business_name=item.segment_business_name;
				// 		obj.slaver_business_name=item.slaver_business_name;
				// 		obj.user_name=item.user_name;
				// 		obj.updated_at=item.updated_at;
				// 		dataT.push(obj)
				// 	})
				// 	_this.PortDataSon=data;
				// 	_this.PortData=dataT;
				// },function(r){
				// 	console.log(r)
				// })
				// _this.checkPort=name;
				// _this.chekcPortId=trid;
				var obj=new Object();
				obj.id=trid;
				obj.url="/ports/show/business/"+trid;
				obj.name='港口业务板块类型关系 港口：'+name;
				obj.submitUrl="/ports/updateOrInsert/"+trid;
				this.sonTableIsShow=true;
				this.$refs.publicbussinessmodule.getTRMessage(obj)
			},
			//主表格tr点击展示次表格
			mainTableTrClick(row){
				this.getTRMessage(row.id,row.name)
			},
			// //子表格点击编辑
			// editTableSon(){
			// 	this.innerVisibleSon=true;
			// 	if(this.PortDataSon.length<=0){
			// 		var obj={	
			// 				id:"N0",
			// 				segment_business_id:null,
			// 				segment_business_name:"",
			// 				segment_business_list:[],
			// 				master_business_id:null,
			// 				master_business_name:"",
			// 				master_business_list:[],
			// 				slaver_business_id:null,
			// 				slaver_business_name:"",
			// 				slaver_business_list:[]
			// 			}
			// 		this.PortDataSon.push(obj)
			// 	}
					
			// },
			//主表格选择框点击
			MainTableSelectChange(e){
				this.MainTableSelectChangeIdList=[];
				e.forEach(item=>{
					this.MainTableSelectChangeIdList.push(item)
				})
			},
			// //次表格编辑弹框复制
			// PortDataSonCopy(id){
			// 	this.PortDataSon.forEach((item,index)=>{
			// 		if(item.id==id){
			// 			let data=JSON.parse(JSON.stringify(this.PortDataSon[index]));
			// 			data.id="N"+this.newid;
			// 			this.newid++;
			// 			this.PortDataSon.push(data);
			// 		}
			// 	})
			// },
			// //次表格编辑弹框删除
			// PortDataSonDelete(id){
			// 	this.$confirm("是否确认删除？","提示",{
			// 		confirmButtonText: '确定',
			// 		cancelButtonText: '取消'
			// 	}).then(()=>{
			// 		this.PortDataSon.forEach((item,index)=>{
			// 			if(item.id==id){
			// 				this.PortDataSon.splice(index,1)
			// 			}
			// 		})
			// 	}).catch(()=>{
					
			// 	})
			// },
			//主表格数据新增和修改提交
			onSubmit(formName){
				this.$refs.buildSettlementCompany.validate(vail=>{
					if(vail){
						var _this=this;
						if(this.innerVisibleType){
							//新增
							this.$postHasMessageFunc("/ports/store",this.buildSettlementCompany,function(respones){
								// let mess=respones.data.data;
								// mess.user_name=mess.users.name;
								// _this.tableData.unshift(mess)
								_this.getMessage()
								_this.handleDialogClose();
							},function(){

							})
						}else{
							//修改
							this.$postHasMessageFunc("/ports/update/"+this.buildSettlementCompany.id,this.buildSettlementCompany,function(respones){
								// let tabledata=JSON.parse(JSON.stringify(_this.tableData))
								// tabledata.forEach((item,index)=>{
								// 	if(item.id==_this.buildSettlementCompany.id){
								// 		let mess=respones.data.data;
								// 		mess.user_name=mess.users.name;
								// 		tabledata[index]=mess;
								// 	}
								// })
								// _this.tableData=tabledata;
								_this.getMessage()
								_this.handleDialogClose();
							},function(){
							})
						}
					}else{
						console.log("表单错误")
						return false;
					}
				})
			},
			//主表格多条删除
			handleDelete() {
				var _this=this;
				this.$batchDelete(this.MainTableSelectChangeIdList,"/ports/destroy",function(){
					_this.getMessage();
				})
			},
			add() {
				
			},
			//分页
			handleSizeChange(val){
              this.getKeyList.per_page = val;
			  this.getKeyList.page = 1;
			  this.getMessage();
			},
			//分页
            handleCurrentChange(val){
			  this.getKeyList.page = val;
			  this.getMessage();
			},
			//主表格新增和修改关闭
			handleDialogClose(){
				this.$refs.buildSettlementCompany.resetFields();
				this.buildSettlementCompany={//新增修改弹框数据
					name:"",//港口名称
					name_code:"",//港口助记码
					country:"",//国家
					status:""//状态
				}
				this.innerVisible=false;
			},
			// //次表格编辑确定
			// handleDialogCommitSon(message){
			// 	var _this= this;
			// 	// _this.PortDataSon.forEach(each=>{
			// 	// })
			// 	_this.$postFunc("/ports/updateOrInsert/"+_this.chekcPortId,message,function(res){
			// 		_this.getTRMessage(_this.chekcPortId,_this.chekcPort)
			// 		_this.innerVisibleSon=false;
			// 	},function(){})
			// 	// if(flag){
			// 	// }
			// },
			// //次表格编辑关闭
			// handleDialogCloseSon(){
			// 	//this.PortDataSon=[];
			// 	this.innerVisibleSon=false;
			// },
			 //批量启用
            handleStart(){
				var _this=this;
				this.$batchEnable(this.MainTableSelectChangeIdList,"/ports/status",function(){
					_this.getMessage();
				})
            },
            //批量禁止
            handleProhibit(){
				var _this=this;
				this.$batchProhibit(this.MainTableSelectChangeIdList,"/ports/status",function(){
					_this.getMessage();
				})
            }
		}
	}
</script>

<style scoped>
	.container { padding: 10px; width:100%;}  
	.cont_border { border-bottom: 2px solid #eeeeee; padding-bottom: 10px; width: 100%; }
	.cont_block{display: block;}
</style>