<!--审批管理  =>合同审批管理(子流程3)-->
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
							<el-button type="info" plain size="mini">重置</el-button>
							<el-button type="success" plain size="mini">查询</el-button>
						</div>
					</el-row>
					<el-row>
						<input type="text" v-model="getKeyList.search" autocomplete="off" placeholder="请输入内容" class="el-input__inner">
					</el-row>
					<el-row>
						<span class="span">办理状态</span>
						<el-select v-model="getKeyList.processingStatus" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">办理结果</span>
						<el-select v-model="getKeyList.processingResult" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">办理步骤</span>
						<el-select v-model="getKeyList.processingSteps" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">结算公司</span>
						<el-select v-model="getKeyList.clear_company_id" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">客户</span>
						<el-select v-model="getKeyList.customer" filterable placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">供应商</span>
						<el-select v-model="getKeyList.supplier" filterable placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">合同类型</span>
						<el-select v-model="getKeyList.type" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">合同编号</span>
						<el-select v-model="getKeyList.sn" filterable placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">价格协议号</span>
						<el-select v-model="getKeyList.priceCartel" filterable placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">业务板块</span>
						<el-select v-model="getKeyList.segment_business_id" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">主业务板块</span>
						<el-select v-model="getKeyList.master_business_id" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">子业务板块</span>
						<el-select v-model="getKeyList.slaver_business_id" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">合同状态</span>
						<el-select v-model="getKeyList.contractStatus" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">业务申请人</span>
						<el-select v-model="getKeyList.process0_user_id" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
						<el-date-picker type="date" placeholder="申请开始时间" size="mini" class="date_input"> </el-date-picker>
						<el-date-picker type="date" placeholder="申请结束时间" size="mini" class="date_input"> </el-date-picker>
					</el-row>
					<el-row>
						<span class="span">商务会签人</span>
						<el-select v-model="getKeyList.process1_user_id" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
						<el-date-picker type="date" placeholder="商务会签开始时间" size="mini" class="date_input"> </el-date-picker>
						<el-date-picker type="date" placeholder="商务会签结束时间" size="mini" class="date_input"> </el-date-picker>
					</el-row>
					<el-row>
						<span class="span">业务会签人</span>
						<el-select v-model="getKeyList.process2_user_id" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
						<el-date-picker type="date" placeholder="业务开始时间" size="mini" class="date_input"> </el-date-picker>
						<el-date-picker type="date" placeholder="业务结束时间" size="mini" class="date_input"> </el-date-picker>
					</el-row>
					<el-row>
						<span class="span">审批人</span>
						<el-select v-model="getKeyList.process3_user_id" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
						<el-date-picker type="date" placeholder="审批开始时间" size="mini" class="date_input"> </el-date-picker>
						<el-date-picker type="date" placeholder="审批结束时间" size="mini" class="date_input"> </el-date-picker>
					</el-row>
					<el-row>
						<span class="span">归档人</span>
						<el-select v-model="getKeyList.process4_user_id" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
						<el-date-picker type="date" placeholder="归档开始时间" size="mini" class="date_input"> </el-date-picker>
						<el-date-picker type="date" placeholder="归档结束时间" size="mini" class="date_input"> </el-date-picker>
					</el-row>
					
				</el-aside>
			</transition>
			<el-main>
				<el-row class="cont_block">
					<el-button type="primary" plain @click="dialogVisibleAddview" size="mini">新增</el-button>
					<el-button type="primary" plain size="mini">批量同意</el-button>
					<el-button type="primary" plain size="mini">批量取消同意</el-button>
					<el-button type="primary" plain size="mini">批量退签</el-button>
					<el-button type="primary" plain size="mini">批量短信呼</el-button>
					<el-button type="primary" plain size="mini">批量启用</el-button>
					<el-button type="danger" plain size="mini">批量禁止</el-button>
					<el-button type="danger" plain size="mini">删除</el-button>
					<!-- <el-button type="primary" plain @click="handleChange"  size="mini">修改</el-button> -->
				</el-row>
				<el-row>
					<el-table  :data="tableData" :header-cell-style="{background:'#e0f4ff',color:'#000'}" border class="mainTable" size="mini" @selection-change="MainTableSelectChange">
						<el-table-column type="selection" prop="Id" align="center" width="55"></el-table-column>
						<el-table-column align="center" type="index" label="操作" prop="id" width="80">
							<template slot-scope="scope">
								<i class="fa fa-edit" aria-hidden="true" @click.stop="mainTableEdit(scope.row.id,scope.row.sn)"></i>
								<i class="fa fa-trash" aria-hidden="true" @click.stop="mainTableSingleDelete(scope.row.id)"></i>
							</template>
						</el-table-column>
						<el-table-column align="center" prop="sn" label="合同编号"></el-table-column>
						<el-table-column align="center" prop="type" label="合同类型"></el-table-column>
						<el-table-column align="center" prop="clear_company_id" label="结算公司id"></el-table-column>
						<el-table-column align="center" prop="processingSteps" label="办理步骤"></el-table-column>
						<el-table-column align="center" prop="inner_sn" label="合同序号"></el-table-column>
						<el-table-column align="center" prop="segment_business_id" label="业务板块"></el-table-column>
						<el-table-column align="center" prop="master_business_id" label="主业务类型"></el-table-column>
						<el-table-column align="center" prop="slaver_business_id" label="子业务类型"></el-table-column>
						<el-table-column align="center" prop="process0_user_id" label="申请人Id"></el-table-column>
						<el-table-column align="center" prop="process0_time" label="申请人时间"></el-table-column>
						<el-table-column align="center" prop="process1_user_id" label="商务会签人id"></el-table-column>
						<el-table-column align="center" prop="process1_time" label="商务会签人时间"></el-table-column>
						<el-table-column align="center" prop="process2_user_id" label="业务会签人id"></el-table-column>
						<el-table-column align="center" prop="process2_time" label="业务会签时间"></el-table-column>
						<el-table-column align="center" prop="process3_user_id" label="审批人id"></el-table-column>
						<el-table-column align="center" prop="process3_time" label="审批会签时间"></el-table-column>
						<el-table-column align="center" prop="process4_user_id" label="归档人id"></el-table-column>
						<el-table-column align="center" prop="process4_time" label="归档时间"></el-table-column>
						<el-table-column align="center" prop="processingStatus" label="办理状态"></el-table-column>
						<el-table-column align="center" prop="processingResult" label="办理结果"></el-table-column>
						<el-table-column align="center" prop="customer" label="客户"></el-table-column>
						<el-table-column align="center" prop="supplier" label="供应商"></el-table-column>
						<el-table-column align="center" prop="priceCartel" label="价格协议编号"></el-table-column>
						<el-table-column align="center" prop="contractEffective" label="合同生效日"></el-table-column>
						<el-table-column align="center" prop="contractFailure" label="合同失效日"></el-table-column>
						<el-table-column align="center" prop="contractStatus" label="合同状态"></el-table-column>
					</el-table>
					<el-pagination background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[10, 50, 100, 200]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total">
					</el-pagination>
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				getKeyList:{
                    search:"",//模糊查询框
                    processingStatus:null,//办理状态
                    processingResult:null,//办理结果
                    processingSteps:null,//办理步骤
                    clear_company_id:null,//结算公司id
                    customer:null,//客户
                    supplier:null,//供应商
                    type:null,//合同类型customer:客户合同、supplier:供应商合同
                    sn:null,//合同编号
                    priceCartel:null,//价格协议编号
                    segment_business_id:null,//业务板块
                    master_business_id:null,//主业务类型
                    slaver_business_id:null,//子业务类型
                    contractStatus:null,//合同状态
                    process0_user_id:null,//业务申请人Id
                    //业务申请人开始时间
                    //业务申请人结束时间
                    process1_user_id:null,//商务会签人id
                    //商务会签人开始时间
                    //商务会签人结束时间
                    process2_user_id:null,//业务会签人id
                    //业务会签人开始时间
                    //业务会签人结束时间
                    process3_user_id:null,//审批人id
                    //审批人开始时间
                    //审批人结束时间
                    process4_user_id:null,//归档人id
                    //归档人开始时间
                    //归档人结束时间

                },
				selectStatus:"1",
				isShowAside:true,//是否展示侧边栏
				businessModule:[//业务板块List数据
					{name:"货运代理2",Id:2},
					{name:"货运代理",Id:1},
					{name:"货运代理3",Id:3}
				],
				MBusinessClassMoudle:[//主业务类型List
					{name:"外贸出口2",Id:2},
					{name:"外贸出口",Id:1},
					{name:"外贸出口3",Id:3}
				],
				SBusinessClass:[//子业务类型List
					{name:"外贸集装箱本港进口2",Id:2},
					{name:"外贸集装箱本港进口",Id:1},
					{name:"外贸集装箱本港进口3",Id:3}
				],
				MainTableSelectChangeIdList:[],//列表页多选框，选中的id
				newid:1,////港口业务板块类型关系编辑弹框新增数据 模拟id(自增)
				fileList:"",
				params:"",
				total: 7,
                currentPage: 1,
　　　　　　　　　pageSize: 10,
				radio:'1',
				buildSettlementCompany:{//新增修改弹框数据
					mnemonicCode:"",
					descName:"",
					name:"",
					status:"",
				},
				rules: {
					mnemonicCode: [
						{ required: true, message: '请输入助记码', trigger: 'blur' },
					],
					Country: [
						{required: true, message: '请输入国家', trigger: 'blur'  }
					],
					Port: [
						{ required: true, message: '请输入港口', trigger: 'blur' }
					],
					status: [
						{required: true, message: '请选择状态',  trigger: 'change' }
					]
				},
				tableData: [//列表数据
					{
						id:"1",
						sn:"编号001",//合同编号
						type:"customer",//合同类型customer:客户合同、supplier:供应商合同
						name:"编号001",//合同名称
						clear_company_id:"结算公司",//结算公司id
						process1_status:"合同草拟",//办理步骤
						inner_sn:"1",//合同序号
						segment_business_id:"1",//业务板块
						master_business_id:"1",//主业务类型
						slaver_business_id:"1",//子业务类型
						process0_user_id:"1",//申请人Id
						process0_time:"2019-09-19",//申请人时间
						process1_user_id:"1",//商务会签人id
						process1_time:"2019-09-19",//商务会签人时间
						process2_user_id:"1",//业务会签人id
						process2_time:"2019-09-19",//业务会签时间
						process3_user_id:"1",//审批人id
						process3_time:"2019-09-19",//审批会签时间
						process4_user_id:"1",//归档人id
						process4_time:"2019-09-19",//归档时间
						processingSteps:"办理步骤",//办理步骤
						processingStatus:"办理状态",//办理状态
						processingResult:"办理结果",//办理结果
						customer:"客户",//客户
						supplier:"供应商",//供应商
						priceCartel:"1",//价格协议编号
						contractEffective:"2019-09-19",//合同生效日
						contractFailure:"2019-09-19",//合同失效日
						contractStatus:"启用",//合同状态
					},
					{
						id:"2",
						sn:"编号002",//合同编号
						type:"customer",//合同类型customer:客户合同、supplier:供应商合同
						name:"编号002",//合同名称
						clear_company_id:"结算公司",//结算公司id
						process1_status:"合同草拟",//办理步骤
						inner_sn:"1",//合同序号
						segment_business_id:"1",//业务板块
						master_business_id:"1",//主业务类型
						slaver_business_id:"1",//子业务类型
						process0_user_id:"1",//申请人Id
						process0_time:"2019-09-19",//申请人时间
						process1_user_id:"1",//商务会签人id
						process1_time:"2019-09-19",//商务会签人时间
						process2_user_id:"1",//业务会签人id
						process2_time:"2019-09-19",//业务会签时间
						process3_user_id:"1",//审批人id
						process3_time:"2019-09-19",//审批会签时间
						process4_user_id:"1",//归档人id
						process4_time:"2019-09-19",//归档时间
						processingSteps:"办理步骤",//办理步骤
						processingStatus:"办理状态",//办理状态
						processingResult:"办理结果",//办理结果
						customer:"客户",//客户
						supplier:"供应商",//供应商
						priceCartel:"1",//价格协议编号
						contractEffective:"2019-09-19",//合同生效日
						contractFailure:"2019-09-19",//合同失效日
						contractStatus:"启用",//合同状态
					}
				],
				optionStatus:[
					{value:1,label:"启用"},{value:0,label:"禁用"}
				],
				optionPerson:[
					{value:1,label:"启用"},{value:0,label:"禁用"}
				],
				contractnumber:0
			}
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			//新增框弹出
			dialogVisibleAddview(){
				var obj=new Object();
				if(this.contractnumber<=0){
					obj.title="合同审批编辑";
				}else{
					obj.title="合同审批编辑"+this.contractnumber;
				}
				this.contractnumber++;
				obj.content="approvalContractAdd";
				this.$emit("clickSearch",obj)
			},
			//主表格单条修改
			mainTableEdit(id,sn){
				this.$getEditMessageId(id,()=>{
					var obj=new Object();
					obj.title="合同审批编辑("+sn+")";
					obj.content="approvalContractAdd";
					this.$emit("clickSearch",obj)
				});
			},
			//主表格单条删除
			mainTableSingleDelete(id){
				this.$confirm("是否确定删除？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消"
				})
				.then(() => {
					this.tableData.forEach((it,index)=>{
						if(id==it.Id){
							this.tableData.splice(index,1)
						}
					})
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
						console.log(this.buildSettlementCompany)
						console.log("表单数据正确")
						if(innerVisibleType){
							//新增
						}else{
							//修改
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
						this.MainTableSelectChangeIdList.forEach(item=>{
							this.tableData.forEach((it,index)=>{
								if(item.Id==it.Id){
									this.tableData.splice(index,1)
								}
							})
						})
					}).catch(()=>{})
				}else{
					this.$message({type:'error',message:'请选择删除的数据'});
				}
			},
			add() {
				
			},
			//分页
			handleSizeChange(val){
              this.pageSize = val;
              this.currentPage = 1;
              //this.fetchData(1, val);
              // console.log(`每页 ${val} 条`);
			},
			//分页
            handleCurrentChange(val){
              this.currentPage = val;
              //this.fetchData(val, this.pageSize);
              // console.log(`当前页: ${val}`);
			},
			//主表格新增和修改关闭
			handleDialogClose(){
				this.$refs.buildSettlementCompany.resetFields();
				this.innerVisible=false;
			}
		},
		components:{
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