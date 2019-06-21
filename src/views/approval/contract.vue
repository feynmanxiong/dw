<template>
	<!--审批管理  =>合同审批管理(子流程3)-->
	<el-container>
		<el-aside width="280px">
			<el-form :inline="true" :model="params" label-position="right">
				<div class="cont_t">自定义查询区</div>
				<el-row class="row_s">
					<div class="cont_btns">					
						<el-button type="info" size="mini">重置</el-button>
						<el-button type="success" size="mini">查询</el-button>
					</div>
				</el-row>
				<el-row>				
					<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input2"></el-input>
				</el-row>
				<el-row>
	  				<el-form-item label="价格协议状态:">
						<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
					    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
		  				</el-select>
	  				</el-form-item>
	  				<el-form-item label="价格协议类型:">
						<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
					    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
		  				</el-select>
	  				</el-form-item>
	  				<el-form-item label="结算公司:">
						<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
					    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
		  				</el-select>
	  				</el-form-item>
	  				<el-form-item label="业务板块:">
						<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
					    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
		  				</el-select>
	  				</el-form-item>
	  				<el-form-item label="主业务板块:">
						<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
					    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
		  				</el-select>
	  				</el-form-item>
	  				<el-form-item label="申请人:">
						<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
					    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
		  				</el-select>
	  				</el-form-item>
	  				<el-form-item label="">
						<div class="block">
						    <el-date-picker v-model="value1" type="date" placeholder="申请开始时间" size="mini" class="date_input"> </el-date-picker>
						</div>
	  				</el-form-item>
	  				<el-form-item label="">
	  					<div class="block">
							<el-date-picker v-model="value1" type="date" placeholder="申请结束时间" size="mini" class="date_input"> </el-date-picker>
						</div>						
	  				</el-form-item>
	  				<el-form-item label="商务会签人:">
						<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
					    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
		  				</el-select>
	  				</el-form-item>
	  				<el-form-item label="">
						<div class="block">
						    <el-date-picker v-model="value1" type="date" placeholder="商务会签开始时间" size="mini" class="date_input"> </el-date-picker>
						</div>
	  				</el-form-item>
	  				<el-form-item label="">
	  					<div class="block">
							<el-date-picker v-model="value1" type="date" placeholder="商务会签结束时间" size="mini" class="date_input"> </el-date-picker>
						</div>						
	  				</el-form-item>
	  				<el-form-item label="业务会签人:">
						<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
					    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
		  				</el-select>
	  				</el-form-item>
	  				<el-form-item label="">
						<div class="block">
						    <el-date-picker v-model="value1" type="date" placeholder="业务会签开始时间" size="mini" class="date_input"> </el-date-picker>
						</div>
	  				</el-form-item>
	  				<el-form-item label="">
	  					<div class="block">
							<el-date-picker v-model="value1" type="date" placeholder="业务会签结束时间" size="mini" class="date_input"> </el-date-picker>
						</div>						
	  				</el-form-item>
	  				<el-form-item label="审批人:">
						<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
					    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
		  				</el-select>
	  				</el-form-item>
	  				<el-form-item label="">
						<div class="block">
						    <el-date-picker v-model="value1" type="date" placeholder="审批开始时间" size="mini" class="date_input"> </el-date-picker>
						</div>
	  				</el-form-item>
	  				<el-form-item label="">
	  					<div class="block">
							<el-date-picker v-model="value1" type="date" placeholder="审批结束时间" size="mini" class="date_input"> </el-date-picker>
						</div>						
	  				</el-form-item>
	  				<el-form-item label="归档人:">
						<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
					    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
		  				</el-select>
	  				</el-form-item>
	  				<el-form-item label="">
						<div class="block">
						    <el-date-picker v-model="value1" type="date" placeholder="归档开始时间" size="mini" class="date_input"> </el-date-picker>
						</div>
	  				</el-form-item>
	  				<el-form-item label="">
	  					<div class="block">
							<el-date-picker v-model="value1" type="date" placeholder="归档结束时间" size="mini" class="date_input"> </el-date-picker>
						</div>						
	  				</el-form-item>
				</el-row>
			</el-form>
		</el-aside>
		<el-main>
			<el-row>
				<el-button type="success" size="mini" @click="dialogVisible = true">新增</el-button>
				<el-button type="success" size="mini">复制</el-button>
				<el-button type="success" size="mini">保存</el-button>
				<el-button type="danger" size="mini">删除</el-button>
				<el-button type="warning" size="mini">提交审核</el-button>
				<el-button type="warning" size="mini">审核</el-button>
				<el-button type="danger" size="mini">批量取消审核</el-button>
				<el-button type="warning" size="mini">批量同意</el-button>
				<el-button type="warning" size="mini">批量退签</el-button>
				<el-button type="success" size="mini">归档</el-button>
				<el-button type="success" size="mini">短信提示</el-button>
			</el-row>
			<el-row>
				<el-table :data="tableData" border stripe style="width: 100%" size="mini" show-summary>
					<el-table-column type="selection" align="center" width="55"></el-table-column>
					<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>					
					<el-table-column prop="test" label="您的办理结果" align="center"></el-table-column>
					<el-table-column prop="test" label="您的办理状态" align="center"></el-table-column>
					<el-table-column prop="test" label="合同审批过程详情" align="center">
					  <el-link type="primary" @click="newDialogVisible = true">查看</el-link>
					</el-table-column>
					<el-table-column prop="test" label="合同编号" align="center"></el-table-column>
					<el-table-column prop="test" label="合同序号" align="center"></el-table-column>
					<el-table-column prop="test" label="甲方" align="center"></el-table-column>
					<el-table-column prop="test" label="乙方" align="center"></el-table-column>
					<el-table-column prop="test" label="丙方" align="center"></el-table-column>
					<el-table-column prop="test" label="业务板块" align="center"></el-table-column>
					<el-table-column prop="test" label="主业务类型" align="center"></el-table-column>
					<el-table-column prop="test" label="步骤一" align="center"></el-table-column>
					<el-table-column prop="test" label="审核情况" align="center"></el-table-column>
				</el-table>
			</el-row>
			<!--合同审批过程详情 start-->
			<el-row>
				<el-dialog title="审核过程记录：" :visible.sync="newDialogVisible" width="50%" :before-close="handleClose">
				  <el-table :data="list" border stripe style="width: 100%" size="mini" show-summary>
					<el-table-column type="selection" align="center" width="55"></el-table-column>
					<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>					
					<el-table-column prop="test" label="步骤" align="center"></el-table-column>
					<el-table-column prop="test" label="办理人" align="center"></el-table-column>
					<el-table-column prop="test" label="办理状态" align="center"></el-table-column>
					<el-table-column prop="test" label="办理结果" align="center"></el-table-column>
					<el-table-column prop="test" label="办理意见" align="center"></el-table-column>
					<el-table-column prop="test" label="办理时间" align="center"></el-table-column>
				</el-table>
				</el-dialog>
			</el-row>
			<!--合同审批过程详情 start-->
			<!--新增合同 start-->
			<el-row class="dialog">
				<el-dialog  title="" :visible.sync="dialogVisible" :modal="false" fullscreen >
					<el-form  :inline="true" :model="params" label-position="right">
						<el-row class="cont_button">
							<div class="cont_border cont_top cont_bm">
								<el-button type="success" size="mini" >新增</el-button>
								<el-button type="success" size="mini">复制</el-button>
								<el-button type="success" size="mini">保存</el-button>
								<el-button type="warning" size="mini">编辑</el-button>
								<el-button type="danger" size="mini" >删除</el-button>
								<el-button type="warning" size="mini">提交审核</el-button>
								<el-button type="warning" size="mini" @click="newCenterDialogVisible = true">审核</el-button>
								<el-button type="success" size="mini" @click="centerDialogVisible = true">归档</el-button>
								<el-button type="success" size="mini" @click="centerDialogVisibleInfo = true">短信</el-button>
							</div>
						</el-row>					
						<el-row class="cont_border cont_bottom_b">
							<el-form-item class="el-item" label="合同编号:" >
								<el-input v-model="input" placeholder="请填写合同编号" size="mini" class="date_input"></el-input>
		  					</el-form-item>
		  					<el-form-item class="el-item" label="对方合同号:" >
								<el-input v-model="input" placeholder="请填写对方合同号" size="mini" class="date_input"></el-input>
		  					</el-form-item>
		  					<el-form-item class="el-item" label="合同名称:" >
								<el-input v-model="input" placeholder="请填写合同名称" size="mini" class="date_input"></el-input>
		  					</el-form-item>
		  					<el-form-item class="el-item" label="合同类型:" >
								<el-input v-model="input" placeholder="客户合同" size="mini" class="date_input"></el-input>
		  					</el-form-item>
		  					<el-form-item class="el-item" label="结算公司:" >
									<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
								    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
					  				</el-select>
			  				</el-form-item>
		  					<el-row>
		  						<el-form-item class="el-item" label="合同甲方:" >
									<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
								    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
					  				</el-select>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="合同乙方:" >
									<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
								    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
					  				</el-select>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="合同丙方:" >
									<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
								    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
					  				</el-select>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="揽货性质:" >
									<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
								    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
					  				</el-select>
			  					</el-form-item>
			  				</el-row>
	  					</el-row>
	  					<el-row>
	  						<el-row>
								<el-button type="success" size="mini" @click="add">新增</el-button>
								<el-button type="danger" size="mini" @click="handleDelete">删除</el-button>
							</el-row>
	  						<el-row class="">
								<el-table :data="tableData" border stripe style="width: 100%" size="mini" show-summary>
									<el-table-column type="selection" align="center" width="55"></el-table-column>
									<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
									<el-table-column prop="test" label="业务板块" align="center" ></el-table-column>
									<el-table-column prop="test" label="主业务板块" align="center"></el-table-column>
									<el-table-column prop="test" label="子业务板块" align="center"></el-table-column>
									<el-table-column prop="test" label="价格协议号" align="center"></el-table-column>
								</el-table>
							</el-row>
	  					</el-row>
	  					<el-row class="cont_border">
	  						<el-form-item class="el-item" label="上传合同附件:" >
								<el-upload class="upload-demo" action="" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
								  <el-button size="mini" type="primary">点击上传</el-button>
								</el-upload>
							</el-form-item>
	  						<el-form-item class="el-item" label="申请人:" >
								<el-input v-model="input" placeholder="请填写合同编号" size="mini" class="date_input"></el-input>
		  					</el-form-item>
		  					<el-form-item  label="申请时间：">2019-6-17</el-form-item>
	  					</el-row>
	  					<el-row>
	  						<span class="cont_m_b">审核过程记录</span>
							<el-table :data="tableData" border stripe style="width: 100%" size="mini" show-summary>
								<el-table-column type="selection" align="center" width="55"></el-table-column>
								<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>					
								<el-table-column prop="test" label="步骤" align="center"></el-table-column>
								<el-table-column prop="test" label="办理人" align="center"></el-table-column>
								<el-table-column prop="test" label="办理状态" align="center"></el-table-column>
								<el-table-column prop="test" label="办理结果" align="center"></el-table-column>
								<el-table-column prop="test" label="办理意见" align="center"></el-table-column>
								<el-table-column prop="test" label="办理时间" align="center"></el-table-column>
							</el-table>
						</el-row>
					</el-form>
				</el-dialog>
			</el-row>
			<!--新增合同 end-->
			<!--审核 start-->
			<el-row>
				<el-dialog title="" :visible.sync="newCenterDialogVisible" width="25%" center>
					<span class="cont_span_t">审核</span>
					<el-row class="">
						<span class="cont_m_b">您的意见是什么？</span>
						<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input>
					</el-row>
					<span slot="footer" class="dialog-footer">
						<el-button type="danger"   size="mini" @click="newCenterDialogVisible = false">退 签</el-button>
					    <el-button type="success" size="mini" @click="newCenterDialogVisible = false">同 意</el-button>
					</span>
				</el-dialog>
			</el-row>
			<!--审核 end-->
			<!--归档 start-->
			<el-row>
				<el-dialog title="" :visible.sync="centerDialogVisible" width="25%" center>
					<span class="cont_span_t">合同归档</span>
					 <el-form  :inline="true" :model="params" label-position="right">
						<el-row class="cont_center">
							<el-form-item class="el-item cont_bm" label="综合序号:" >
								<el-input v-model="input" placeholder="请填写合同编号" size="mini" class="date_input2"></el-input>
		  					</el-form-item>
		  					<el-row>
			  					<el-form-item class="el-item" label="客户标示：" >
					  				<el-radio-group class="el-item" v-model="radio">
									    <el-radio :label="3">是</el-radio>
									    <el-radio :label="6">否</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-row>
						</el-row>
					</el-form>
					<span slot="footer" class="dialog-footer">
					    <el-button size="mini" type="success" @click="centerDialogVisible = false">确 定</el-button>
					</span>
				</el-dialog>
			</el-row>
			<!--归档 end-->
			<!--短信 start-->
			<el-row>
				<el-dialog title="" :visible.sync="centerDialogVisibleInfo" width="50%" center>
					<span class="cont_span_t">短信提示</span>
					<el-row class="">
						<span class="cont_m_b">提示人选择</span>
						<el-table :data="tableData" border stripe style="width: 100%" size="mini" show-summary>
							<el-table-column type="selection" align="center" width="55"></el-table-column>
							<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>					
							<el-table-column prop="test" label="提示人姓名" align="center"></el-table-column>
							<el-table-column prop="test" label="提示人手机号码" align="center"></el-table-column>
							<el-table-column prop="test" label="发送短信模板" align="center"></el-table-column>
						</el-table>
					</el-row>
					<span slot="footer" class="dialog-footer">
						<el-button  size="mini" type="danger" @click="centerDialogVisibleInfo = false">取  消</el-button>
					    <el-button  size="mini" type="success" @click="centerDialogVisibleInfo = false">确  定</el-button>
					</span>
				</el-dialog>
			</el-row>
			<!--短信 end-->
		</el-main>
	</el-container>
</template>

<script>export default {
	data() {
		return {
			input:'',
			textarea:'',
			radio: '0',
			dialogVisible:false,
			newDialogVisible:false,
			centerDialogVisible:false,
			newCenterDialogVisible:false,
			centerDialogVisibleInfo:false,
			options: [{
				value: '选项1',
				label: '黄金糕'
			}, {
				value: '选项2',
				label: '双皮奶'
			}, {
				value: '选项3',
				label: '蚵仔煎'
			}, {
				value: '选项4',
				label: '龙须面'
			}, {
				value: '选项5',
				label: '北京烤鸭'}],
			tableData: [{
				test:'test'
			}],
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
			}
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			handleDelete(index, row) {
				console.log(index)
				console.log(row)
				this.$confirm("此操作将永久删除该店铺和其下所有数据,是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.tableData.splice(index, 1)
					})
			},
			add() {
				this.n++;
				this.tableData.push({
					id: this.n,
					test: 'test',
					state: false
				});
			}
		}
	}
</script>

<style scoped>
	.el-aside {background-color:#E4E4E4;padding:10px;margin:10px 0 10px 10px;text-align: right;}
	.el-main{padding:10px;}
	.el-item{margin-right:20px;}
	.el-form-item{margin-right:0;}
	.el-item{margin-right:20px;}
</style>