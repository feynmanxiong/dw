<!--基础资料=>商务基础数据=>开票类型维护  merchantInvoice-->                                                                                                                                                                                                                                                     
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
						<input type="text" v-model="getKeyList.keyword" placeholder="请输入内容" class="el-input__inner">
					</el-row> -->
					<el-row>
						<span class="span">收付标志</span>
						<div class="block">
							<el-select v-model="getKeyList.direction" placeholder="收付标志">
								<el-option v-for="item in direction" :key="item.key" :label="item.value" :value="item.key"></el-option>
							</el-select>
						</div>			
					</el-row>
					<el-row>
						<span class="span">开票类型</span>
						<div class="block">
							<el-select v-model="getKeyList.name" placeholder="开票类型">
								<el-option v-for="item in name" :key="item" :label="item" :value="item"></el-option>
							</el-select>
						</div>			
					</el-row>
					<el-row>
						<span class="span">税率</span>
						<div class="block">
							<el-select v-model="getKeyList.tax_rate" placeholder="税率">
								<el-option v-for="item in tax_rate" :key="item" :label="item+'%'" :value="item"></el-option>
							</el-select>
						</div>		
					</el-row>
				</el-aside>
			</transition>
			<el-main>
				<el-row class="cont_block">
					<el-button type="primary" plain @click="innerVisible=true;innerVisibleType=true;" size="mini">新增</el-button>
					<el-button size="mini" plain  type="danger" @click="handleDelete">删除</el-button>
					<el-button size="mini" plain  type="primary" @click="handleStart">启用</el-button>
                    <el-button size="mini" plain  type="danger" @click="handleProhibit">禁用</el-button>
				</el-row>
				<el-row>
					<el-table  :data="tableData" :header-cell-style="{background:'#e0f4ff',color:'#000'}" border class="mainTable" size="mini" @selection-change="MainTableSelectChange">
						<el-table-column type="selection" prop="id" align="center" width="55"></el-table-column>
						<el-table-column align="center" type="index" label="编辑" prop="id" width="80">
							<template slot-scope="scope">
								<i class="fa fa-edit" aria-hidden="true" @click.stop="mainTableEdit(scope.row.id)"></i>
								<i class="fa fa-trash" aria-hidden="true" @click.stop="mainTableSingleDelete(scope.row.id)"></i>
							</template>
						</el-table-column>
						<el-table-column align="center" :sortable="true" prop="status" label="状态">
							<template slot-scope="scope">{{scope.row.status==1?"启用":"禁用"}}</template>
						</el-table-column>
						<el-table-column align="center" :sortable="true" prop="direction" label="收付标志">
                            <template slot-scope="scope">{{scope.row.direction==1?"收":scope.row.direction==2?"付":"收付"}}</template>
                        </el-table-column>
						<el-table-column align="center" :sortable="true" prop="name" label="开票类型"></el-table-column>
						<el-table-column align="center" :sortable="true" prop="tax_rate" label="税率">
							<template slot-scope="scope">{{scope.row.tax_rate+'%'}}</template>
						</el-table-column>
						<el-table-column align="center" :sortable="true" prop="user_name" label="操作人"></el-table-column>
						<el-table-column align="center" :sortable="true" prop="updated_at" label="操作时间"></el-table-column>
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
			</el-main>
			<!--港口维护主表添加start-->
			<el-dialog title="新建开票类型" :visible.sync="innerVisible" :append-to-body="true" :modal="true" :before-close="handleDialogClose">
				<el-form ref="buildSettlementCompany" :rules="rules" :model="buildSettlementCompany"  label-width="80px"  size="small">
					<el-form-item label="开票类型" prop="name">
						<el-input v-model="buildSettlementCompany.name"></el-input>
					</el-form-item>
					<el-form-item label="收付标志" prop="direction">
						<el-select v-model="buildSettlementCompany.direction" placeholder="请选择收付标志">
							<el-option v-for="item in direction" :key="item.key" :label="item.value" :value="item.key"></el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="税率" prop="tax_rate">
						<el-input v-model="buildSettlementCompany.tax_rate" @keyup.native="proving"></el-input>
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
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				direction:[],//收付列表
				name:[],//开票类型列表
				tax_rate:[],//税率列表
				getKeyList:{
					page:1,//第几页，默认第一页
					per_page:10,//每页记录数，默认是10
					direction:"",//收付标志 1：收，2：付，3：收付
					tax_rate:"",//税率
					name:""//开票类型
				},
				isShowAside:true,//是否展示侧边栏
				innerVisible:false,//港口维护主表添加弹框是否显示
				innerVisibleType:true,//港口维护主表添加弹框是添加还是删除状态  添加:true  删除:false
				userlist:[],//操作人列表
				Port:[],//航线列表
				MainTableSelectChangeIdList:[],//列表页多选框，选中的id
				newid:1,////装箱门点/业务板块类型关系编辑弹框新增数据 模拟id(自增)
				total: 7,
                currentPage: 1,
　　　　　　　　　pageSize: 10,
				buildSettlementCompany:{//新增修改弹框数据
					id:"",
                    status:"",
					name:"",
                    direction:"",
                    tax_rate:""
				},
				rules: {
					tax_rate: [
						{ required: true, message: '请输入税率', trigger: 'blur' },
					],
					direction: [
						{required: true, message: '请选择收付标志', trigger: 'blur'  }
					],
					name: [
						{ required: true, message: '请输入开票类型', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请输入开票类型', trigger: 'blur' }
					],
					status: [
						{ required: true, message: '请选择状态', trigger: 'blur' }
					]
				},
				tableData: [//列表数据
					
				]
				
			}
		},
		computed: {},
		created() {
			this.getMessage();
		},
		mounted() {},
		methods: {
			//验证只能输入正整数
			proving(){
				this.buildSettlementCompany.tax_rate=this.buildSettlementCompany.tax_rate.replace(/[^\.\d]/g,'');
				this.buildSettlementCompany.tax_rate=this.buildSettlementCompany.tax_rate.replace('.','');
			},
			//查询按钮
			select(){
				this.getMessage()
				this.sonTableIsShow=false;
			},
			//重置按钮
			reset(){
				this.getKeyList={page:1,per_page:10,direction:"",tax_rate:"",name:""}
				this.getMessage()
				this.sonTableIsShow=false;
			},
			//获取数据
			getMessage(){
				var _this=this;
				this.$postFunc("/InvoiceType/list",this.getKeyList,function(respones){
					_this.tableData=respones.data.data.result;
					_this.direction=respones.data.data.direction;
					_this.name=respones.data.data.name;
					_this.tax_rate=respones.data.data.tax_rate;
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
					_this.$postHasMessageFunc("/InvoiceType/destroy",{ids:id},function(res){
						_this.getMessage()
					},function(){})
				}).catch(()=>{})
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
							this.$postHasMessageFunc("/InvoiceType/invoiceadd",this.buildSettlementCompany,function(respones){
								_this.getMessage()
								_this.handleDialogClose();
							},function(){

							})
						}else{
							//修改
							this.$postHasMessageFunc("/InvoiceType/invoiceupdate",this.buildSettlementCompany,function(respones){
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
				this.$batchDelete(this.MainTableSelectChangeIdList,"/InvoiceType/destroy",function(){
					_this.getMessage();
				})
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
                    status:"",
					name:"",
                    direction:"",
                    tax_rate:""
				}
				this.innerVisible=false;
			},
			//批量启用
            handleStart(){
				var _this=this;
				this.$batchEnable(this.MainTableSelectChangeIdList,"/InvoiceType/statusupdate",function(){
					_this.getMessage();
				})
            },
            //批量禁止
            handleProhibit(){ 
				var _this=this;
				this.$batchProhibit(this.MainTableSelectChangeIdList,"/InvoiceType/statusupdate",function(){
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
