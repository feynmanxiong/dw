<!--基础资料=>结算公司管理    settle-->
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
				<el-aside width="240px"  v-show="isShowAside" class="select_box">
					<div class="select_in" @click="isShowAside=false">
						<i class="el-submenu__icon-arrow el-icon-arrow-left"></i>
					</div>
					<div class="cont_t">自定义查询区</div>
					<el-row class="el-m publicSelect">
						<div align="center">					
							<el-button type="info" size="mini" plain @click="resetSelect">重置</el-button>
							<el-button type="success" size="mini" plain @click="getMessage">查询</el-button>
						</div>
					</el-row>
					<el-row>				
						<el-input v-model="getKeyList.search" placeholder="助记码、全称、简称查询" size="mini" class="date_box"></el-input>
					</el-row>
					<el-row>
						<span class="span">状态</span>
						<el-select v-model="getKeyList.status" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="'1'"></el-option>
							<el-option :label="'禁用'" :value="'0'"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">操作人</span>
						<div class="block">
							<el-select v-model="getKeyList.operate_user_id" placeholder="请选择" size="mini" class="date_box">
								<el-option v-for="item in optionPerson" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
						</div>			
					</el-row>
				</el-aside>
			</transition>
			<el-main>
				<el-row class="cont_block">
					<el-button type="primary" plain @click="innerVisible=true;innerVisibleType=true;" size="mini">新增</el-button>
					<!-- <el-button type="primary" plain @click="handleChange"   size="mini">修改</el-button> -->
					<el-button size="mini" plain type="danger" @click="handleDelete">删除</el-button>
				</el-row>
				<el-row>
					<el-table  :data="tableData" :header-cell-style="{background:'#e0f4ff',color:'#000'}" border size="mini" @selection-change="MainTableSelectChange">
						<el-table-column type="selection" align="center" prop="id"></el-table-column>
						<el-table-column align="center" prop="id" label="操作">
							<template slot-scope="scope">
								<i class="fa fa-edit" aria-hidden="true" @click.stop="mainTableEdit(scope.row.id)"></i>
								<i class="fa fa-trash" aria-hidden="true" @click.stop="mainTableSingleDelete(scope.row.id)"></i>
							</template>
						</el-table-column>
						<el-table-column align="center" prop="name_code" label="助记码"></el-table-column>
						<el-table-column align="center" prop="name_abbreviation" label="简称"></el-table-column>
						<el-table-column align="center" prop="name" label="全称"></el-table-column>
						<el-table-column align="center" prop="status" label="状态"></el-table-column>
						<el-table-column align="center" prop="user_name" label="操作人"></el-table-column>
						<el-table-column align="center" prop="updated_at" label="操作时间"></el-table-column>
					</el-table>
					<el-pagination background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="getKeyList.current_page"
						:page-sizes="[10, 50, 100, 200]"
						:page-size="getKeyList.pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total">
					</el-pagination>
				</el-row>
			</el-main>
			<!--结算公司弹框添加start-->
			<el-dialog title="新建结算公司" :visible.sync="innerVisible" :append-to-body="true" :modal="true" :before-close="handleDialogClose">
				<el-form ref="buildSettlementCompany" :rules="rules" :model="buildSettlementCompany"  label-width="80px"  size="small">
					<el-form-item label="助记码" prop="name_code">
						<el-input v-model="buildSettlementCompany.name_code"></el-input>
					</el-form-item>
					<el-form-item label="简称" prop="name_abbreviation">
						<el-input v-model="buildSettlementCompany.name_abbreviation"></el-input>
					</el-form-item>
					<el-form-item label="全称" prop="name">
						<el-input v-model="buildSettlementCompany.name"></el-input>
					</el-form-item>
					<el-form-item label="状态" prop="status">
						<el-select v-model="buildSettlementCompany.status" placeholder="请选择状态">
							<el-option label="启用" value="1"></el-option>
							<el-option label="禁用" value="0"></el-option>
						</el-select>
					</el-form-item>
					 <el-form-item size="small">
						<el-button type="primary" @click="onSubmit">{{innerVisibleType?"添加":"保存"}}</el-button>
						<el-button @click="handleDialogClose">取消</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
			<!--结算公司弹框添加end-->
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isShowAside:true,//是否展示侧边栏
				innerVisible:false,//结算公司添加弹框是否显示
				MainTableSelectChangeIdList:[],//列表页多选框，选中的id
				innerVisibleType:true,//港口维护主表添加弹框是添加还是修改状态  添加:true  修改:false
				fileList:"",
				params:"",
				total: 1,
				radio:'1',
				getKeyList:{
					search:"",//模糊查询助记码、全称、简称
					status:null,//状态查询
					operate_user_id:null,//操作人查询
					current_page: 1,
					per_page: 10,//每页几条
				},
				buildSettlementCompany:{
					name_code:"",
					name_abbreviation:"",
					name:"",
					status:"" 
				},
				rules: {
					name_code: [
						{ required: true, message: '请输入助记码', trigger: 'blur' }
					],
					name_abbreviation: [
						{required: true, message: '请输入简称', trigger: 'blur'  }
					],
					name: [
						{ required: true, message: '请输入全称', trigger: 'blur' }
					],
					status: [
						{required: true, message: '请选择状态',  trigger: 'change' }
					]
				},
				tableData: [
					
				],
				value:'',
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				value1: '',
				value2: '',
				optionStatus:[
					{value:1,label:"启用"},{value:0,label:"禁用"}
				],
				optionPerson:[]
			}
		},
		computed: {},
		created() {
			this.getMessage();
		},
		mounted() {},
		methods: {
			//主表格单条修改
			mainTableEdit(id){
				this.tableData.forEach((it,index)=>{
					if(id==it.id){
						this.buildSettlementCompany=it;
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
					this.tableData.forEach((it,index)=>{
						if(id==it.id){
							this.tableData.splice(index,1)
						}
					})
				}).catch(()=>{})
			},
			MainTableSelectChange(e){
				this.MainTableSelectChangeIdList=[];
				e.forEach(item=>{
					this.MainTableSelectChangeIdList.push(item)
				})
			},
			//重置查询
			resetSelect(){
				this.getKeyList={search:"",	status:null,operate_user_id:null,current_page: 1,per_page: 10}
				this.getMessage()
			},
			//获取主表数据
			getMessage(){
				var _this=this;
				var obj = new Object();
				// obj.params={search:_this.getKeyList.search,page:_this.getKeyList.current_page,status:_this.getKeyList.status};
				// obj.params=this.getKeyList;
				this.$postFunc("/clearCompanies/list",this.getKeyList,function(response){
					//_this.getKeyList.search=response.data.search;
					//_this.getKeyList.user_id=response.data.user_id;
					console.log(response)
					_this.getKeyList.current_page=response.data.data.current_page;
					_this.getKeyList.per_page=response.data.data.per_page;
					_this.total=response.data.data.total;
					_this.tableData=response.data.data.result;
					_this.optionPerson=response.data.data.users;
					console.log(response.data.data)
					
				},function(error){
					console.log(error)
				})
			},
			handleDelete() {
				if(this.MainTableSelectChangeIdList.length>0){
					this.$confirm("是否确定删除？", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消"
					})
					.then(() => {
						this.MainTableSelectChangeIdList.forEach(item=>{
							this.tableData.forEach((it,index)=>{
								if(item.id==it.id){
									this.tableData.splice(index,1)
								}
							})
						})
					}).catch(()=>{})
				}else{
					this.$message({type:'error',message:'请选择删除的数据'});
				}
			},
			onSubmit(formName){
				this.$refs.buildSettlementCompany.validate(vail=>{
					if(vail){
						console.log(this.buildSettlementCompany)
						if(this.innerVisibleType){
							this.$postFunc("/clearCompanies/store",this.buildSettlementCompany,function(response){
								console.log(response)
								this.tableData.unshift(this.buildSettlementCompany);
								this.buildSettlementCompany={name_code:"",name_abbreviation:"",name:"",status:"" }
								this.innerVisible=false;
							},function(error){
								console.log(error)
							})
						}else{

						}
					}else{
						console.log("表单错误")
						return false;
					}
				})
			},
			add() {
				
			},
			handleSizeChange(val){
              this.getKeyList.per_page = val;
              this.getKeyList.current_page = 1;
              //this.fetchData(1, val);
              // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val){
              this.getKeyList.current_page = val;
              //this.fetchData(val, this.pageSize);
              // console.log(`当前页: ${val}`);
			},
			handleDialogClose(){
				this.$refs.buildSettlementCompany.resetFields();
				this.innerVisible=false;
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
</style>