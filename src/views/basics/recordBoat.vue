<!--基础资料=>业务基础数据=>航名/航次维护   recordBoat -->
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
						<span class="span">船公司</span>
						<div class="block">
							<el-select v-model="getKeyList.customer_supplier_id" @change="shipCompanyChange" filterable placeholder="请选择" size="mini" class="date_box">
								<el-option v-for="item in shipCompany" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
						</div>			
					</el-row>
					<el-row>
						<span class="span">船名</span>
						<div class="block">
							<el-select v-model="getKeyList.customer_supplier_ship_data_id" filterable placeholder="请选择" size="mini" class="date_box">
								<el-option v-for="item in Port.list" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
						</div>			
					</el-row>
					<el-row>
						<span class="span">操作人</span>
						<div class="block">
							<el-select v-model="getKeyList.user" placeholder="请选择" size="mini" class="date_box">
								<el-option v-for="item in userlist" :key="item.key" :label="item.value" :value="item.key"> </el-option>
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
						<el-table-column type="selection" prop="customer_supplier_ship_data_id" align="center" width="55"></el-table-column>
						<el-table-column align="center" type="index" label="编辑" prop="id" width="80">
							<template slot-scope="scope">
								<i class="fa fa-edit" aria-hidden="true" @click.stop="mainTableEdit(scope.row.customer_supplier_ship_data_id)"></i>
								<i class="fa fa-trash" aria-hidden="true" @click.stop="mainTableSingleDelete(scope.row.customer_supplier_ship_data_id)"></i>
							</template>
						</el-table-column>
						<el-table-column align="center" :sortable="true" prop="customer_supplier_ship_data_status" label="状态">
							<template slot-scope="scope">{{scope.row.customer_supplier_ship_data_status==1?"启用":"禁用"}}</template>
						</el-table-column>
						<el-table-column align="center" :sortable="true" prop="customer_supplier_name" label="船公司"></el-table-column>
						<el-table-column align="center" :sortable="true" prop="customer_supplier_ship_data_name" label="船名"></el-table-column>
						<el-table-column align="center" :sortable="true" prop="customer_supplier_ship_data_user_name" label="操作人"></el-table-column>
						<el-table-column align="center" :sortable="true" prop="customer_supplier_ship_data_updated_at" label="操作时间"></el-table-column>
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
					<div class="STableTitle clearfix">
						<span>船名/业务板块类型关系 &nbsp;&nbsp;&nbsp;船名：{{checkPort}}</span>
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
			</el-main>
			<!--港口维护主表添加start-->
			<el-dialog title="新建船名" :visible.sync="innerVisible" :append-to-body="true" :modal="true" :before-close="handleDialogClose">
				<el-form ref="buildSettlementCompany" :rules="rules" :model="buildSettlementCompany"  label-width="80px"  size="small">
					<el-form-item label="船公司" prop="customer_supplier_id">
						<el-select v-model="buildSettlementCompany.customer_supplier_id" filterable placeholder="请选择" size="mini" class="date_box">
							<el-option v-for="item in shipCompany" :key="item.id" :label="item.name" :value="item.id"> </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="船名" prop="customer_supplier_ship_data_name">
						<el-input v-model="buildSettlementCompany.customer_supplier_ship_data_name"></el-input>
					</el-form-item>
					<el-form-item label="状态" prop="customer_supplier_ship_data_status">
						<el-select v-model="buildSettlementCompany.customer_supplier_ship_data_status" placeholder="请选择状态">
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
			<el-dialog :title="'船名/业务板块类型关系 船名：'+checkPort" :visible.sync="innerVisibleSon" width="70%" :append-to-body="true" :modal="true" :before-close="handleDialogCloseSon">
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
			</el-dialog>
			<!--港口维护子表添加end-->
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {

				getKeyList:{
					page:1,//第几页，默认第一页
					per_page:10,//每页记录数，默认是10
					search:"",//模糊搜索
					status:"",//状态0:禁用，1:启用
					customer_supplier_id:"",//船公司id
					customer_supplier_ship_data_id:"",//船名id
					segment_business_id:"",//主业务板块
					master_business_id:"",//主业务类型
					slaver_business_id:""//子业务类型
				},
				isShowAside:true,//是否展示侧边栏
				innerVisible:false,//港口维护主表添加弹框是否显示
				innerVisibleSon:false,//港口维护子表添加弹框是否显示，
				innerVisibleType:true,//港口维护主表添加弹框是添加还是删除状态  添加:true  删除:false
				sonTableIsShow:false,//港口业务板块类型关系编辑是否展示 是true  否false
				userlist:[],//操作人列表
				Port:[],//船名列表
				businessModule:this.$store.state.businessModule,//业务板块List数据
				MBusinessClass:[//主业务类型List
				],
				SBusinessClass:[//子业务类型List
				],
				MainTableSelectChangeIdList:[],//列表页多选框，选中的id
				checkPort:"",//船名/业务板块类型关系    船名{{checkPort}}数据展示
				chekcPortId:"",//船名/业务板块类型关系id
				newid:1,////船名/业务板块类型关系编辑弹框新增数据 模拟id(自增)
				fileList:"",
				params:"",
				total: 7,
                currentPage: 1,
　　　　　　　　　pageSize: 10,
				radio:'1',
				buildSettlementCompany:{//新增修改弹框数据
					customer_supplier_id:"",//船公司ID
					customer_supplier_ship_data_id:null,//船id
					customer_supplier_ship_data_name:"",//航名称
					customer_supplier_ship_data_status:""//状态
				},
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
				rules: {
					customer_supplier_id: [
						{ required: true, message: '请选择船公司', trigger: 'blur' },
					],
					customer_supplier_ship_data_name: [
						{ required: true, message: '请输入船名', trigger: 'blur' }
					],
					customer_supplier_ship_data_status: [
						{required: true, message: '请选择状态',  trigger: 'change' }
					]
				},
				tableData: [//列表数据
					
				],
				PortData:[//港口业务板块类型关系  数据
					// {businessMoudle:"龙达",MBusinessClass:"龙达集团",SBusinessClass:"启用",operator:"person",time:"2019-09-19"},
					// {businessMoudle:"龙达",MBusinessClass:"龙达集团",SBusinessClass:"启用",operator:"person",time:"2019-09-19"},
					// {businessMoudle:"龙达",MBusinessClass:"龙达集团",SBusinessClass:"启用",operator:"person",time:"2019-09-19"},
					// {businessMoudle:"龙达",MBusinessClass:"龙达集团",SBusinessClass:"启用",operator:"person",time:"2019-09-19"}
				],
				shipCompany:[]//船公司列表
			}
		},
		computed: {},
		created() {
			this.getMessage();
			this.getBoatCompany();
		},
		mounted() {},
		methods: {
			//根据船公司获取船名
			shipCompanyChange(){
				var obj=new Object();
				this.shipCompany.forEach(item=>{
					if(item.id==this.getKeyList.customer_supplier_id){
						obj.id=item.id;
						obj.list=item.list;
					}
				})
				this.Port=obj;
				console.log(this.Port)
			},
			//获取船公司
			getBoatCompany(){
				this.$postFunc("/customerSupplierShipData/list/result",{},(res)=>{
					console.log(res)
					this.shipCompany=res.data.data;
				},function(){})
			},
			//查询按钮
			select(){
				this.getMessage()
				this.sonTableIsShow=false;
			},
			//重置按钮
			reset(){
				this.getKeyList={page:1,per_page:10,search:"",status:"",customer_supplier_id:"",customer_supplier_ship_data_id:"",segment_business_id:"",master_business_id:"",slaver_business_id:""}
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
				this.$postFunc("/customerSupplierShipData/list",this.getKeyList,function(respones){
					console.log(respones)
					_this.tableData=respones.data.data.result;
					_this.userlist=respones.data.data.user;
					//_this.Port=respones.data.data.name;
					_this.total=respones.data.data.total;
				},function(){

				})
			},
			//主表格单条修改
			mainTableEdit(id){
				this.tableData.forEach((it,index)=>{
					if(id==it.customer_supplier_ship_data_id){
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
					_this.$postFunc("/customerSupplierShipData/destroy",{ids:id},function(res){
						// _this.tableData.forEach((it,index)=>{
						// 	if(id==it.customer_supplier_ship_data_id){
						// 		_this.tableData.splice(index,1)
						// 	}
						// })
						_this.getMessage()
					},function(){})
				}).catch(()=>{})
			},
			//获取tr的表格数据
			getTRMessage(trid,name){
				var _this=this;
				_this.$postFunc("/customerSupplierShipData/show/business/"+trid,{},function(res){
					console.log(res)
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
				_this.checkPort=name;
				_this.chekcPortId=trid;
				_this.sonTableIsShow=true;
			},
			//主表格tr点击展示次表格
			mainTableTrClick(row){
				this.getTRMessage(row.customer_supplier_ship_data_id,row.customer_supplier_ship_data_name)
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
			//主表格选择框点击
			MainTableSelectChange(e){
				this.MainTableSelectChangeIdList=[];
				e.forEach(item=>{
					this.MainTableSelectChangeIdList.push(item)
				})
			},
			//次表格编辑弹框复制
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
			//次表格编辑弹框删除
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
			//主表格数据新增和修改提交
			onSubmit(formName){
				this.$refs.buildSettlementCompany.validate(vail=>{
					if(vail){
						var _this=this;
						if(this.innerVisibleType){
							//新增
							this.$postFunc("/customerSupplierShipData/update",this.buildSettlementCompany,function(respones){
								// console.log(respones)
								// let mess=respones.data.data;
								// mess.customer_supplier_ship_data_user_name=mess.customer_supplier_ship_data_user_name;
								// _this.tableData.unshift(mess)
								_this.getMessage()
								_this.handleDialogClose();
							},function(){

							})
						}else{
							//修改
							this.$postFunc("/customerSupplierShipData/update",this.buildSettlementCompany,function(respones){
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
				if(this.MainTableSelectChangeIdList.length>0){
					this.$confirm("是否确定删除？", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消"
					})
					.then(() => {
						var ids="";
						this.MainTableSelectChangeIdList.forEach(item=>{
							ids+=item.customer_supplier_ship_data_id+",";
						})
						ids=ids.substring(0,ids.length-1);
						var _this=this;
						_this.$postFunc("/customerSupplierShipData/destroy",{ids:ids},function(res){
							_this.getMessage();
						},function(){})
					}).catch(()=>{})
				}else{
					this.$message({type:'error',message:'请选择删除的数据'});
				}
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
					customer_supplier_id:"",//船公司ID
					id:null,//船id
					name:"",//航名称
					status:""//状态
				}
				this.innerVisible=false;
			},
			//次表格编辑确定
			handleDialogCommitSon(){
				var list=new Array();
				var _this=this;
				_this.PortDataSon.forEach(each=>{
					var obj=new Object();
					obj.segment_business_id=each.segment_business_id;
					obj.master_business_id=each.master_business_id;
					obj.slaver_business_id=each.slaver_business_id;
					list.push(obj)
				})
				_this.$postFunc("/customerSupplierShipData/update/business/"+_this.chekcPortId,list,function(res){
					_this.getTRMessage(_this.chekcPortId,_this.chekcPort)
					_this.innerVisibleSon=false;
				},function(){})
			},
			//次表格编辑关闭
			handleDialogCloseSon(){
				//this.PortDataSon=[];
				this.innerVisibleSon=false;
			},
            //批量启用
            handleStart(){
                if(this.MainTableSelectChangeIdList.length>0){
					this.$confirm("是否确定启用？", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消"
					})
					.then(() => {
						var ids="";
						this.MainTableSelectChangeIdList.forEach(item=>{
							ids+=item.customer_supplier_ship_data_id+",";
						})
						ids=ids.substring(0,ids.length-1);
						var _this=this;
						_this.$postFunc("/customerSupplierShipData/status",{ids:ids,status:1},function(res){
							_this.getMessage();
						},function(){})
					}).catch(()=>{})
				}else{
					this.$message({type:'error',message:'请选择启用的数据'});
				}
            },
            //批量禁止
            handleProhibit(){ 
                 if(this.MainTableSelectChangeIdList.length>0){
					this.$confirm("是否确定禁用？", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消"
					})
					.then(() => {
						var ids="";
						this.MainTableSelectChangeIdList.forEach(item=>{
							ids+=item.customer_supplier_ship_data_id+",";
						})
						ids=ids.substring(0,ids.length-1);
						var _this=this;
						_this.$postFunc("/customerSupplierShipData/status",{ids:ids,status:0},function(res){
							_this.getMessage();
						},function(){})
					}).catch(()=>{})
				}else{
					this.$message({type:'error',message:'请选择启用的数据'});
				}
            },
			// handleChange(){
			// 	if(this.MainTableSelectChangeIdList.length==1){
			// 		this.innerVisibleType=false;
			// 		this.innerVisible=true;
			// 		console.log(this.buildSettlementCompany);
			// 		console.log(this.MainTableSelectChangeIdList[0])
			// 		this.buildSettlementCompany=this.MainTableSelectChangeIdList[0]
			// 	}else{
			// 		this.$message({type:'error',message:'修改数据仅可选择一条'});
			// 	}
			// }
		}
	}
</script>

<style scoped>
	.container { padding: 10px; width:100%;}  
	.cont_border { border-bottom: 2px solid #eeeeee; padding-bottom: 10px; width: 100%; }
	.cont_block{display: block;}
	.STable{}
	.STableTitle_btn{float: right;margin-bottom:0;}
</style>