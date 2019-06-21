<!--基础资料=>商务基础数据=>开票类型维护  merchantInvoice-->                                                                                                                                                                                                                                                     
<template>
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
	  				<el-form-item label="税率:">
						<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
					    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
		  				</el-select>
	  				</el-form-item>
				</el-row>
			</el-form>
		</el-aside>
		<el-main>
			<el-row class="cont_block">
				<el-button type="success" @click="add" size="mini">新增</el-button>
				<el-button type="success"  size="mini">复制</el-button>
				<el-button type="success"  size="mini">保存</el-button>
				<el-button size="mini" type="danger" @click="handleDelete">删除</el-button>
			</el-row>
			<el-row>
				<el-table  :data="tableData" border size="mini">
					<el-table-column type="selection" align="center" width="55"></el-table-column>
					<el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
					<el-table-column align="center" prop="test" label="收付标志"></el-table-column>
					<el-table-column align="center" prop="test" label="开票类型"></el-table-column>
					<el-table-column align="center" prop="test" label="税率"></el-table-column>
					<el-table-column align="center" prop="test" label="录入人"></el-table-column>
					<el-table-column align="center" prop="test" label="录入时间"></el-table-column>
				</el-table>
			</el-row>
			<!--新增开票类型   start-->
			
		</el-main>
	</el-container>
</template>

<script>export default {
	data() {
		return {
			n: 1,
			tableData: [{
				id: 1,
				test: 'test'
			}],
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
						test: 'test'
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
	.el-item{margin-right:40px;}
	.cont_block{display: block;}
</style>