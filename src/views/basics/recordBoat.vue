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
					<businessmodule ref="publicbussinessmodule" @getTrMessage="getTRMessage"></businessmodule>
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
					customer_supplier_id:"",//船公司id
					customer_supplier_ship_data_id:"",//船名id
					segment_business_id:"",//主业务板块
					master_business_id:"",//主业务类型
					slaver_business_id:""//子业务类型
				},
				isShowAside:true,//是否展示侧边栏
				innerVisible:false,//港口维护主表添加弹框是否显示
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
				total: 7,
                currentPage: 1,
　　　　　　　　　pageSize: 10,
				buildSettlementCompany:{//新增修改弹框数据
					customer_supplier_id:"",//船公司ID
					customer_supplier_ship_data_id:null,//船id
					customer_supplier_ship_data_name:"",//航名称
					customer_supplier_ship_data_status:""//状态
				},
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
				shipCompany:[]//船公司列表
			}
		},
		computed: {},
		created() {
			this.getMessage();
			this.getBoatCompany();
		},
		mounted() {},
		components:{
			businessmodule:businessModule
		},
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
					_this.$postHasMessageFunc("/customerSupplierShipData/destroy",{ids:id},function(res){
						_this.getMessage()
					},function(){})
				}).catch(()=>{})
			},
			//获取tr的表格数据
			getTRMessage(trid,name){
				var obj=new Object();
				obj.id=trid;
				obj.url="/customerSupplierShipData/show/business/"+trid;
				obj.name='船名/业务板块类型关系 船名：'+name;
				obj.submitUrl="/customerSupplierShipData/update/business/"+trid;
				this.sonTableIsShow=true;
				this.$refs.publicbussinessmodule.getTRMessage(obj)
			},
			//主表格tr点击展示次表格
			mainTableTrClick(row){
				this.getTRMessage(row.customer_supplier_ship_data_id,row.customer_supplier_ship_data_name)
			},
			//主表格选择框点击
			MainTableSelectChange(e){
				this.MainTableSelectChangeIdList=[];
				e.forEach(item=>{
					this.MainTableSelectChangeIdList.push(item)
				})
			},
			//主表格数据新增和修改提交
			onSubmit(formName){
				this.$refs.buildSettlementCompany.validate(vail=>{
					if(vail){
						var _this=this;
						if(this.innerVisibleType){
							//新增
							this.$postHasMessageFunc("/customerSupplierShipData/update",this.buildSettlementCompany,function(respones){
								_this.getMessage()
								_this.handleDialogClose();
							},function(){

							})
						}else{
							//修改
							this.$postHasMessageFunc("/customerSupplierShipData/update",this.buildSettlementCompany,function(respones){
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
				this.$batchDelete(this.MainTableSelectChangeIdList,"/customerSupplierShipData/destroy",function(){
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
					customer_supplier_id:"",//船公司ID
					id:null,//船id
					name:"",//航名称
					status:""//状态
				}
				this.innerVisible=false;
			},
            //批量启用
            handleStart(){
				var _this=this;
				this.$batchEnable(this.MainTableSelectChangeIdList,"/customerSupplierShipData/status",function(){
					_this.getMessage();
				})
            },
            //批量禁止
            handleProhibit(){ 
				var _this=this;
				this.$batchProhibit(this.MainTableSelectChangeIdList,"/customerSupplierShipData/status",function(){
					_this.getMessage();
				})
            },
		}
	}
</script>

<style scoped>
	.container { padding: 10px; width:100%;}  
	.cont_border { border-bottom: 2px solid #eeeeee; padding-bottom: 10px; width: 100%; }
	.cont_block{display: block;}
</style>