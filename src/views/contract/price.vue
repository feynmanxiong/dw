<template>
	<!--价格管理  =>价格管理-->
	<el-container>
		<el-aside width="290px">
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
					<el-form-item label="价格协议号:">
						<el-input v-model="input" placeholder="价格协议号" size="mini" class="date_input"></el-input>
	  				</el-form-item>
	  				<el-form-item label="价格协议名称:">
						<el-input v-model="input" placeholder="价格协议名称" size="mini" class="date_input"></el-input>
	  				</el-form-item>
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
	  				<el-form-item label="子业务板块:">
						<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
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
				</el-row>
			</el-form>
		</el-aside>
		<el-main>
			<el-row>
				<el-button type="success" size="mini" @click="dialogVisible = true">新增</el-button>
				<el-button type="success" size="mini">复制</el-button>
				<el-button type="success" size="mini">保存</el-button>
				<el-button type="warning" size="mini">编辑</el-button>
				<el-button type="danger" size="mini">删除</el-button>
				<el-button type="warning" size="mini">提交审核</el-button>
				<el-button type="warning" size="mini">审核</el-button>
				<el-button type="danger" size="mini">关闭</el-button>
			</el-row>
			<el-row>
				<el-table :data="tableData" border stripe style="width: 100%" size="mini" show-summary>
					<el-table-column type="selection" align="center" width="55"></el-table-column>
					<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>					
					<el-table-column prop="test" label="结算单位" align="center"></el-table-column>
					<el-table-column prop="test" label="结算公司" align="center"></el-table-column>
					<el-table-column prop="test" label="业务板块" align="center"></el-table-column>
					<el-table-column prop="test" label="主业务类型" align="center"></el-table-column>
					<el-table-column prop="test" label="子业务类型" align="center"></el-table-column>
					<el-table-column prop="test" label="合同类型" align="center"></el-table-column>
					<el-table-column prop="test" label="合同编号" align="center"></el-table-column>
					<el-table-column prop="test" label="合同生效日" align="center"></el-table-column>
					<el-table-column prop="test" label="合同失效日" align="center"></el-table-column>
					<el-table-column prop="test" label="信控结算日" align="center"></el-table-column>
					<el-table-column prop="test" label="本外港选择" align="center"></el-table-column>
					<el-table-column prop="test" label="信控金额" align="center"></el-table-column>
					<el-table-column prop="test" label="最后宽限日" align="center"></el-table-column>
					<el-table-column prop="test" label="过期标志" align="center"></el-table-column>
					<el-table-column prop="test" label="创建人" align="center"></el-table-column>
					<el-table-column prop="test" label="创建时间" align="center"></el-table-column>
					<el-table-column prop="test" label="修改人" align="center"></el-table-column>
					<el-table-column prop="test" label="修改时间" align="center"></el-table-column>
					<el-table-column prop="test" label="审核人" align="center"></el-table-column>
					<el-table-column prop="test" label="审核时间" align="center"></el-table-column>
				</el-table>
			</el-row>
			<!--新增价格协议   start-->
			<el-dialog title="" :visible.sync="dialogVisible" :modal="false" fullscreen>
				<el-form  :inline="true" :model="params" label-position="right">
					<el-row class="cont_button">
						<div class="cont_border cont_top cont_bm">
							<el-button type="success" size="mini" @click="add">新增</el-button>
							<el-button type="success" size="mini">复制</el-button>
							<el-button type="success" size="mini">保存</el-button>
							<el-button type="warning" size="mini">编辑</el-button>
							<el-button type="danger" size="mini" @click="handleDelete">删除</el-button>
							<el-button type="warning" size="mini">提交审核</el-button>
							<el-button type="warning" size="mini">审核</el-button>
							<el-button type="danger" size="mini">关闭</el-button>
						</div>
					</el-row>					
					<el-row class="cont_border">
						<el-form-item class="el-item" label="价格协议号:" >
							<el-input v-model="input" placeholder="价格协议号" size="mini" class="date_input"></el-input>
	  					</el-form-item>
	  					<el-form-item class="el-item" label="价格协议名称:" >
							<el-input v-model="input" placeholder="价格协议号" size="mini" class="date_input"></el-input>
	  					</el-form-item>
	  					<el-form-item class="el-item" label="价格协议内容:" >
							<el-input v-model="input" placeholder="请输入价格协议内容，100字以内" size="mini" class="date_input5"></el-input>
	  					</el-form-item>
	  					<el-row>
		  					<el-form-item class="el-item" label="结算公司:" >
								<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
							    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
				  				</el-select>
		  					</el-form-item>
		  					<el-form-item class="el-item" label="业务板块:" >
								<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
							    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
				  				</el-select>
		  					</el-form-item>
		  					<el-form-item class="el-item" label="主业务类型:" >
								<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
							    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
				  				</el-select>
		  					</el-form-item>
		  					<el-form-item class="el-item" label="子业务类型:" >
								<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
							    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
				  				</el-select>
		  					</el-form-item>
		  				</el-row>
  					</el-row>
  					<el-row>
  						<b class="cont_m_b">船港信息</b>
  						<el-row class="">
							<el-table :data="tableData" border stripe style="width: 100%" size="mini" show-summary>
								<el-table-column type="selection" align="center" width="55"></el-table-column>
								<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
								<el-table-column prop="test" label="收付标志" align="center" ></el-table-column>
								<el-table-column prop="test" label="费用科目名称" align="center"></el-table-column>
								<el-table-column prop="test" label="免税标志" align="center"></el-table-column>
								<el-table-column prop="test" label="应收单位来源" align="center"></el-table-column>
								<el-table-column prop="test" label="固定应收单位" align="center" disabled></el-table-column>
								<el-table-column prop="test" label="应付单位来源" align="center"></el-table-column>
								<el-table-column prop="test" label="固定应付单位" align="center"></el-table-column>
								<el-table-column prop="test" label="币别" align="center"></el-table-column>
								<el-table-column prop="test" label="开票类型" align="center"></el-table-column>
								<el-table-column prop="test" label="税率" align="center"></el-table-column>
								<el-table-column prop="test" label="单价" align="center"></el-table-column>
								<el-table-column prop="test" label="计算单位" align="center"></el-table-column>
								<el-table-column prop="test" label="箱量类型" align="center"></el-table-column>
								<el-table-column prop="test" label="最小值开票金额" align="center"></el-table-column>
								<el-table-column prop="test" label="最大值开票金额" align="center"></el-table-column>
								<el-table-column prop="test" label="单值限制" align="center"></el-table-column>
								<el-table-column prop="test" label="操作符" align="center"></el-table-column>
								<el-table-column prop="test" label="值" align="center"></el-table-column>
								<el-table-column prop="test" label="单值限制2" align="center"></el-table-column>
								<el-table-column prop="test" label="操作符" align="center"></el-table-column>
								<el-table-column prop="test" label="值" align="center"></el-table-column>
								<el-table-column prop="test" label="条件限制" align="center"></el-table-column>
																
							</el-table>
						</el-row>
  					</el-row>
  					<el-row class="cont_top">
  						<div class="flex w">
  							<div class="flex_1">
		  						<el-form-item class="cont_block" label="创建人:">
									<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>									
			  					</el-form-item>
			  					<el-form-item  label="创建时间：">2019-6-17</el-form-item>
		  					</div>
		  					<div class="flex_1">
		  						<el-form-item class="cont_block" label="修改人:">
									<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>									
			  					</el-form-item>
			  					<el-form-item  label="修改时间：">2019-6-17</el-form-item>
		  					</div>
		  					<div class="flex_1">
		  						<el-form-item class="cont_block" label="审核人:">
									<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>									
			  					</el-form-item>
			  					<el-form-item  label="审核时间：">2019-6-17</el-form-item>
		  					</div>
	  					</div>
  					</el-row>
  					
				</el-form>
			</el-dialog>
			<!--新增价格协议   end-->
		</el-main>
	</el-container>
</template>

<script>export default {
	data() {
		return {
			input:'',
			dialogVisible:false,
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
	.w{width:60%;}
	.el-container { width: 100%;font-size:14px;color:#333;}  
	.el-aside {background-color:#E4E4E4;padding:10px;margin:10px 0 10px 10px;text-align: right;}
	.el-main{padding:10px;}
	.el-form-item{padding:0;margin:0;}
	.el-item{margin-right:20px;}
	.cont_block{display: block;}

</style>