<!--基础资料=>商务基础数据=>费用科目维护  merchantCost-->                                                                                                                                                                                                                                                     
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
							<el-button type="info" plain size="mini">重置</el-button>
							<el-button type="success" plain size="mini">查询</el-button>
						</div>
					</el-row>
					<el-row>
						<span class="span">状态</span>
						<el-select v-model="selectStatus" placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">费用科目代码</span>
						<el-select placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">费用科目名称</span>
						<el-select placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">默认币别</span>
						<el-select placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">操作人</span>
						<el-select placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">业务板块</span>
						<el-select placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">主业务类型</span>
						<el-select placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">子业务类型</span>
						<el-select placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">免税标志</span>
						<el-select placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
					<el-row>
						<span class="span">结算公司</span>
						<el-select placeholder="请选择" size="mini" class="date_box">
							<el-option :label="'启用'" :value="1"></el-option>
							<el-option :label="'禁用'" :value="0"></el-option>
						</el-select>
					</el-row>
				</el-aside>
			</transition>
			<el-main>
				<el-row class="cont_block">
					<el-button type="primary" plain @click="innerVisible=true;innerVisibleType=true;" size="mini">新增</el-button>
					<el-button type="primary" plain @click="handleChange"  size="mini">修改</el-button>
					<el-button size="mini" plain type="danger" @click="handleDelete">删除</el-button>
				</el-row>
				<el-row>
					<el-table  :data="tableData" border :header-cell-style="{background:'#e0f4ff',color:'#000'}" size="mini" @selection-change="MainTableSelectChange">
						<el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
						<el-table-column type="selection" prop="Id" align="center" width="55"></el-table-column>
						<el-table-column align="center" prop="status" label="状态"></el-table-column>
						<el-table-column align="center" prop="mnemonicCode" label="费用科目代码"></el-table-column>
						<el-table-column align="center" prop="Port" label="费用科目名称"></el-table-column>
						<el-table-column align="center" prop="Country" label="默认币别"></el-table-column>
						<el-table-column align="center" prop="operator" label="操作人"></el-table-column>
						<el-table-column align="center" prop="time" label="操作时间"></el-table-column>
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
				<div class="STable">
					<div class="STableTitle clearfix">
						<span>费用科目/结算公司/业务板块类型/开票类型税率/免税标志关系</span>
						<el-button plain class="STableTitle_btn" type="primary" size="small" @click="innerVisibleSon=true">编辑</el-button>
					</div>
					  <template>
						<el-table :header-cell-style="{background:'#e0f4ff',color:'#000'}" :data="PortData" border size="mini">
							<el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
							<el-table-column align="center" prop="settlementCompany" label="结算公司"></el-table-column>
							<el-table-column align="center" prop="businessMoudle" label="业务板块"></el-table-column>
							<el-table-column align="center" prop="MBusinessClass" label="主业务类型"></el-table-column>
							<el-table-column align="center" prop="SBusinessClass" label="子业务类型"></el-table-column>
							<el-table-column align="center" prop="invoiceClass" label="开票类型"></el-table-column>
							<el-table-column align="center" prop="taxRate" label="税率"></el-table-column>
							<el-table-column align="center" prop="isTaxRate" label="是否免税"></el-table-column>
							<el-table-column align="center" prop="operation" label="操作人"></el-table-column>
							<el-table-column align="center" prop="time" label="操作时间"></el-table-column>
						</el-table>
					</template>
				</div>
			</el-main>
			<!--港口维护主表添加start-->
			<el-dialog title="新建费用科目单" :visible.sync="innerVisible" :append-to-body="true" :modal="true" :before-close="handleDialogClose">
				<el-form ref="bulidMerchantCost" :rules="rules" :model="bulidMerchantCost"  label-width="80px"  size="small">
					<el-form-item label="费用科目代码" prop="mnemonicCode">
						<el-input v-model="bulidMerchantCost.mnemonicCode"></el-input>
					</el-form-item>
					<el-form-item label="费用科目名称" prop="Port">
						<el-input v-model="bulidMerchantCost.Port"></el-input>
					</el-form-item>
					<el-form-item label="默认币别" prop="Port">
						<el-select v-model="bulidMerchantCost.Country" placeholder="请选择币别">
							<el-option label="CNY" value="1"></el-option>
							<el-option label="USD" value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="状态" prop="status">
						<el-select v-model="bulidMerchantCost.status" placeholder="请选择状态">
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
			<!--港口维护主表添加end-->
			<!--港口维护子表添加start-->
			<el-dialog :title="'费用科目/结算公司/业务板块类型/开票类型税率/免税标志关系'" :visible.sync="innerVisibleSon" width="70%" :append-to-body="true" :modal="true" :before-close="handleDialogCloseSon">
				<el-table :header-cell-style="{background:'#e0f4ff',color:'#000'}" :data="PortDataSon" border size="mini" class="PortDataSon"  style="margin-bottom:10px;">
					<el-table-column align="center" prop="Id" label="操作" width="80">
						<template slot-scope="scope">
							<i class="fa fa-plus" aria-hidden="true" @click="PortDataSonCopy(scope.row.Id)"></i>
							<i class="fa fa-trash" aria-hidden="true" @click="PortDataSonDelete(scope.row.Id)"></i>
						</template>
					</el-table-column>
					<el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
					<el-table-column align="center" prop="businessMoudle" label="业务模块">
						<template slot-scope="scope">
							<el-select v-model="scope.row.businessModule" placeholder="请选择" class="selectInTable">
								<el-option v-for="item in businessModule" :label="item.name" :key="item.Id" :value="item.Id"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="MBusinessClass" label="主业务类型">
						<template slot-scope="scope">
							<el-select v-model="scope.row.MBusinessClass" placeholder="请选择" class="selectInTable">
								<el-option v-for="item in MBusinessClassMoudle" :label="item.name" :key="item.Id" :value="item.Id"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="SBusinessClass" label="子业务类型">
						<template slot-scope="scope">
							<el-select v-model="scope.row.SBusinessClass" placeholder="请选择" class="selectInTable">
								<el-option v-for="item in SBusinessClass" :label="item.name" :key="item.Id" :value="item.Id"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="invoiceClass" label="开票类型">
						<template slot-scope="scope">
							<el-select v-model="scope.row.invoiceClass" placeholder="请选择" class="selectInTable">
								<el-option v-for="item in invoiceClass" :label="item.name" :key="item.Id" :value="item.Id"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="taxRate" label="税率">
						<template slot-scope="scope">
							<el-select v-model="scope.row.taxRate" placeholder="请选择" class="selectInTable">
								<el-option v-for="item in taxRate" :label="item.name" :key="item.Id" :value="item.Id"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="isTaxRate" label="是否免税">
						<template slot-scope="scope">
							<el-select v-model="scope.row.isTaxRate" placeholder="请选择" class="selectInTable">
								<el-option v-for="item in isTaxRate" :label="item.name" :key="item.Id" :value="item.Id"></el-option>
							</el-select>
						</template>
					</el-table-column>
				</el-table>
				<span slot="footer" class="dialog-footer">
					<el-button @click="handleDialogCloseSon" size="small">取 消</el-button>
					<el-button type="primary" @click="handleDialogCloseSon" size="small">确 定</el-button>
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
				isShowAside:true,//是否展示侧边栏
				selectStatus:null,//状态查询
				selectPerson:"",//操作人查询
				Country:"",//国家查询
				Port:"",//港口查询
				businessModule:"",//业务模块查询
				MBusinessClass:"",//主业务类型查询
				SBusinessClass:"",//子业务类型插叙你
				innerVisible:false,//港口维护主表添加弹框是否显示
				innerVisibleSon:false,//港口维护子表添加弹框是否显示，
				innerVisibleType:true,//港口维护主表添加弹框是添加还是删除状态  添加:true  删除:false
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
				invoiceClass:[//开票类型List数据
					{name:"增6%",Id:2},
					{name:"增8%",Id:1},
					{name:"增9%",Id:3}
				],
				taxRate:[//税率List
					{name:"6%",Id:2},
					{name:"8%",Id:1},
					{name:"9%",Id:3}
				],
				isTaxRate:[//是否免税List
					{name:"是",Id:1},
					{name:"否",Id:0}
				],
				MainTableSelectChangeIdList:[],//列表页多选框，选中的id
				checkPort:"上海",//港口业务板块类型关系    港口{{checkPort}}数据展示
				newid:1,////港口业务板块类型关系编辑弹框新增数据 模拟id(自增)
				fileList:"",
				params:"",
				total: 7,
                currentPage: 1,
　　　　　　　　　pageSize: 10,
				radio:'1',
				bulidMerchantCost:{//新增修改弹框数据
					mnemonicCode:"",
					descName:"",
					name:"",
					status:"",
				},
				PortDataSon:[//港口业务板块类型关系编辑 数据
					{Id:1,businessModule:1,MBusinessClass:2,SBusinessClass:3,invoiceClass:1,taxRate:1,isTaxRate:1},
					{Id:2,businessModule:2,MBusinessClass:2,SBusinessClass:3,invoiceClass:1,taxRate:2,isTaxRate:1},
					{Id:3,businessModule:1,MBusinessClass:2,SBusinessClass:3,invoiceClass:2,taxRate:1,isTaxRate:0}
				],
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
					{Id:1,mnemonicCode: 'CH1',Port:"换单费",Country:"CHY",status:"启用",operator:"person",time:"2019-09-19"},
					{Id:2,mnemonicCode: 'CH2',Port:"报关费",Country:"USD",status:"启用",operator:"person",time:"2019-09-19"},
					{Id:3,mnemonicCode: 'CH3',Port:"换单费",Country:"CHY",status:"启用",operator:"person",time:"2019-09-19"},
					{Id:4,mnemonicCode: 'CH4',Port:"报关费",Country:"CHY",status:"启用",operator:"person",time:"2019-09-19"},
					{Id:5,mnemonicCode: 'CH5',Port:"换单费",Country:"USD",status:"启用",operator:"person",time:"2019-09-19"},
					{Id:6,mnemonicCode: 'CH6',Port:"报关费",Country:"CHY",status:"启用",operator:"person",time:"2019-09-19"},
					{Id:7,mnemonicCode: 'CH7',Port:"换单费",Country:"USD",status:"禁用",operator:"person",time:"2019-09-19"}
				],
				PortData:[//港口业务板块类型关系  数据
					{settlementCompany:"龙达",businessMoudle:"货运代理",MBusinessClass:"外贸进口",SBusinessClass:"外贸集装箱本地进口",invoiceClass:"增8%",taxRate:"6%",isTaxRate:"是",operation:"操作人",time:"2019-09-19"},
					{settlementCompany:"龙达",businessMoudle:"货运代理",MBusinessClass:"外贸进口",SBusinessClass:"外贸集装箱本地进口",invoiceClass:"增8%",taxRate:"6%",isTaxRate:"是",operation:"操作人",time:"2019-09-19"},
					{settlementCompany:"龙达",businessMoudle:"货运代理",MBusinessClass:"外贸进口",SBusinessClass:"外贸集装箱本地进口",invoiceClass:"增8%",taxRate:"6%",isTaxRate:"是",operation:"操作人",time:"2019-09-19"},
					{settlementCompany:"龙达",businessMoudle:"货运代理",MBusinessClass:"外贸进口",SBusinessClass:"外贸集装箱本地进口",invoiceClass:"增8%",taxRate:"6%",isTaxRate:"是",operation:"操作人",time:"2019-09-19"},
					{settlementCompany:"龙达",businessMoudle:"货运代理",MBusinessClass:"外贸进口",SBusinessClass:"外贸集装箱本地进口",invoiceClass:"增8%",taxRate:"6%",isTaxRate:"是",operation:"操作人",time:"2019-09-19"}
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
				optionPerson:[
					{value:1,label:"启用"},{value:0,label:"禁用"}
				]
				
			}
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			MainTableSelectChange(e){
				this.MainTableSelectChangeIdList=[];
				e.forEach(item=>{
					this.MainTableSelectChangeIdList.push(item)
				})
			},
			PortDataSonCopy(id){
				this.PortDataSon.forEach((item,index)=>{
					if(item.Id==id){
						let data=JSON.parse(JSON.stringify(this.PortDataSon[index]));
						data.Id="N"+this.newid;
						this.newid++;
						this.PortDataSon.push(data);
					}
				})
			},
			PortDataSonDelete(id){
				var _this=this;
				this.$confirm("是否确认删除？","提示",{
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then(()=>{
					this.PortDataSon.forEach((item,index)=>{
						if(item.Id==id){
							this.PortDataSon.splice(index,1)
						}
					})
				}).catch(()=>{
					
				})
			},
			onSubmit(formName){
				this.$refs.bulidMerchantCost.validate(vail=>{
					if(vail){
						console.log(this.bulidMerchantCost)
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
			handleSizeChange(val){
              this.pageSize = val;
              this.currentPage = 1;
              //this.fetchData(1, val);
              // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val){
              this.currentPage = val;
              //this.fetchData(val, this.pageSize);
              // console.log(`当前页: ${val}`);
			},
			handleDialogClose(){
				this.$refs.bulidMerchantCost.resetFields();
				this.innerVisible=false;
			},
			handleDialogCloseSon(){
				//this.PortDataSon=[];
				this.innerVisibleSon=false;
			},
			handleChange(){
				if(this.MainTableSelectChangeIdList.length==1){
					this.innerVisibleType=false;
					this.innerVisible=true;
					console.log(this.bulidMerchantCost);
					console.log(this.MainTableSelectChangeIdList[0])
					this.bulidMerchantCost=this.MainTableSelectChangeIdList[0]
				}else{
					this.$message({type:'error',message:'修改数据仅可选择一条'});
				}
			}
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