<template>
	<!--客户供应商管理  =>客户供应商管理-->
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
	  				<el-form-item label="办理状态:">
						<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
					    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
		  				</el-select>
	  				</el-form-item>
	  				<el-form-item label="办理结果:">
						<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
					    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
		  				</el-select>
	  				</el-form-item>
	  				<el-form-item label="结算公司:">
						<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
					    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
		  				</el-select>
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
			</el-row>
			<el-row>
				<el-table :data="tableData" border stripe style="width: 100%" size="mini" show-summary>
					<el-table-column type="selection" align="center" width="55"></el-table-column>
					<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>					
					<el-table-column prop="test" label="生效状态" align="center"></el-table-column>
					<el-table-column prop="test" label="公司/个人全称" align="center"></el-table-column>
					<el-table-column prop="test" label="公司/个人简称" align="center"></el-table-column>
					<el-table-column prop="test" label="公司/个人助记码" align="center"></el-table-column>
					<el-table-column prop="test" label="纳税人识别号" align="center"></el-table-column>
					<el-table-column prop="test" label="物流角色" align="center"></el-table-column>
					<el-table-column prop="test" label="客户标志" align="center"></el-table-column>
					<el-table-column prop="test" label="供应商标志" align="center"></el-table-column>
					<el-table-column prop="test" label="结算单位标志" align="center"></el-table-column>
				</el-table>
			</el-row>
			<!--新增合同   start-->
			<el-row class="dialog">
				<el-dialog  title="" :visible.sync="dialogVisible" :modal="false" fullscreen >
					<el-form  :inline="true" :model="params" label-position="right">
						<el-row class="cont_button">
							<div class="cont_border cont_top cont_bm">
								<el-button type="success" size="mini">新增</el-button>
								<el-button type="success" size="mini">复制</el-button>
								<el-button type="success" size="mini">保存</el-button>
								<el-button type="warning" size="mini">编辑</el-button>
								<el-button type="danger" size="mini">删除</el-button>
								<el-button type="warning" size="mini">提交审核</el-button>
								<el-button type="warning" size="mini">审核</el-button>
								<el-button type="success" size="mini">信控维护</el-button>
								<el-button type="success" size="mini">合同维护</el-button>
								<el-button type="warning" size="mini">变更记录</el-button>
							</div>
						</el-row>					
						<el-row class="cont_border">
							<div class="cont_bottom_b">
								<el-row>
									<el-form-item class="el-item" label="个人/个人全称:" >
										<el-input v-model="input" placeholder="价格协议号" size="mini" class="date_input"></el-input>
				  					</el-form-item>
				  					<el-form-item class="el-item" label="公司/公司全称:" >
										<el-input v-model="input" placeholder="价格协议号" size="mini" class="date_input"></el-input>
				  					</el-form-item>
				  					<el-form-item class="el-item" label="公司/个人助记码:" >
										<el-input v-model="input" placeholder="请输入助记码" size="mini" class="date_input"></el-input>
				  					</el-form-item>
				  					<el-form-item class="el-item" label="公司纳税人识别号:" >
										<el-input v-model="input" placeholder="公司纳税人识别号" size="mini" class="date_input2"></el-input>
				  					</el-form-item>
				  				</el-row>
				  				<el-row>
									<el-form-item class="el-item" label="联系人:" >
										<el-input v-model="input" placeholder="请录入全称" size="mini" class="date_input"></el-input>
				  					</el-form-item>
				  					<el-form-item class="el-item" label="身份证:" >
										<el-input v-model="input" placeholder="请录入身份证" size="mini" class="date_input"></el-input>
				  					</el-form-item>
				  					<el-form-item class="el-item" label="固定电话:" >
										<el-input v-model="input" placeholder="固定号码" size="mini" class="date_input"></el-input>
				  					</el-form-item>
				  					<el-form-item class="el-item" label="手机号码:" >
										<el-input v-model="input" placeholder="请录入手机号码" size="mini" class="date_input2"></el-input>
				  					</el-form-item>
				  				</el-row>
			  					<el-row >
				  					<el-form-item class="el-item" label="国家:" >
										<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
									    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
						  				</el-select>
				  					</el-form-item>
				  					<el-form-item class="el-item" label="省:" >
										<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
									    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
						  				</el-select>
				  					</el-form-item>
				  					<el-form-item class="el-item" label="详细地址:" >
										<el-input v-model="input" placeholder="请录入详细地址" size="mini" class="date_input5"></el-input>
				  					</el-form-item>
				  					<el-form-item class="el-item" label="E-mail:" >
										<el-input v-model="input" placeholder="请录入E-mail地址" size="mini" class="date_input2"></el-input>
				  					</el-form-item>
				  				</el-row>
			  				</div>
			  				<el-row class="cont_bottom_b cont_top">
			  					<el-form-item class="el-item" label="客户标示：" >
					  				<el-radio-group class="el-item" v-model="radio">
									    <el-radio :label="1">是</el-radio>
									    <el-radio :label="2">否</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item class="el-item" label="供应商标志：" >
					  				<el-radio-group class="el-item" v-model="radio">
									    <el-radio :label="1">是</el-radio>
									    <el-radio :label="2">否</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item class="el-item" label="结算单位标志：" >
					  				<el-radio-group class="el-item" v-model="radio">
									    <el-radio :label="1">是</el-radio>
									    <el-radio :label="2">否</el-radio>
									</el-radio-group>
								</el-form-item>
		  					</el-row>
		  					<el-row class="cont_bottom_b">
		  						<div class="flex">
			  						<span class="flex_1">物流角色勾选：</span>
			  						<el-form-item class="el-item flex_1" label="城市:" >
										<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
									    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
						  				</el-select>
					  				</el-form-item>
		  						</div>
		  						<el-row class="cont_top">
		  							<el-checkbox class="el-item" v-model="checked">委托人</el-checkbox>
		  							<el-checkbox class="el-item" v-model="checked">船公司</el-checkbox>
		  							<el-checkbox class="el-item" v-model="checked">订舱公司</el-checkbox>
		  							<el-checkbox class="el-item" v-model="checked">换单公司</el-checkbox>
		  							<el-checkbox class="el-item" v-model="checked">货代公司</el-checkbox>
		  							<el-checkbox class="el-item" v-model="checked">车队</el-checkbox>
		  							<el-checkbox class="el-item" v-model="checked">保险公司</el-checkbox>
		  							<el-checkbox class="el-item" v-model="checked">仓储公司</el-checkbox>
		  							<el-checkbox class="el-item" v-model="checked">铁路公司</el-checkbox>
		  						</el-row>
		  						<el-row class="cont_top">
		  							<el-checkbox class="el-item" v-model="checked">开证公司</el-checkbox>
		  							<el-checkbox class="el-item" v-model="checked">装箱公司</el-checkbox>
		  							<el-checkbox class="el-item" v-model="checked">还箱公司</el-checkbox>
		  							<el-checkbox class="el-item" v-model="checked">检测公司</el-checkbox>
		  							<el-checkbox class="el-item" v-model="checked">消毒公司</el-checkbox>
		  							<el-checkbox class="el-item" v-model="checked">熏蒸公司</el-checkbox>
		  							<el-checkbox class="el-item" v-model="checked">理货公司</el-checkbox>
		  							<el-checkbox class="el-item" v-model="checked">装卸公司</el-checkbox>
		  							<el-checkbox class="el-item" v-model="checked">其它</el-checkbox>
		  						</el-row>
		  					</el-row>
		  					<el-row>
	  							<el-form-item class="el-item" label="开户行:" >
									<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
								    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
					  				</el-select>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="开户行:" >
									<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
								    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
					  				</el-select>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="信控金额:" >
									<el-input v-model="input" placeholder="请录入信控金额" size="mini" class="date_input"></el-input>
			  					</el-form-item>
	  						</el-row>
	  						<el-row>
	  							<el-form-item class="el-item" label="银行账户:" >
									<el-input v-model="input" placeholder="请录银行卡账号" size="mini" class="date_input"></el-input>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="默认付款条件:" >
									<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
								    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
					  				</el-select>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="信控宽限天数:" >
									<el-input v-model="input" placeholder="请录入宽限天数" size="mini" class="date_input"></el-input>
			  					</el-form-item>
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
			</el-row>
			<!--新增合同    end-->
		</el-main>
	</el-container>
</template>

<script>export default {
	data() {
		return {
			input:'',
			radio:'1',
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
	methods: {}
}</script>

<style scoped>
	.w{width:60%;}
	.el-container { width: 100%;font-size:14px;color:#333;}  
	.el-aside {background-color:#E4E4E4;padding:10px;margin:10px 0 10px 10px;text-align: right;}
	.el-main{padding:10px;}
	.el-form-item{padding:0;margin:0;}
	.el-item{margin-right:40px;}
	.cont_block{display: block;}
</style>