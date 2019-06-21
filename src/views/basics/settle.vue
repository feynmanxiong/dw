<!--基础资料=>结算公司管理    settle-->
<template>
	<div class="container">
		<el-row class="cont_border cont_block">
			<el-button type="success" size="mini" @click="add">新增</el-button>
			<el-button type="danger" size="mini" @click="handleDelete">删除</el-button>
		</el-row>
		<el-row class="cont_block">
			<el-table :data="tableData" border stripe style="width: 100%" size="mini" show-summary>
				<el-table-column type="selection" align="center" width="55"></el-table-column>
				<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
				<el-table-column prop="test" label="结算公司" align="center"></el-table-column>
				<el-table-column prop="test" label="操作" align="center">
					<template slot-scope="scope">
						<el-radio v-model="radio" label="1">启用</el-radio>
  						<el-radio v-model="radio" label="2">禁用</el-radio>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				radio:'1',
				tableData: [{
					test: 'test'
				}],
				value:'',
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
	.container { padding: 10px; width:100%;}  
	.cont_border { border-bottom: 2px solid #eeeeee; padding-bottom: 10px; width: 100%; }
	.cont_block{display: block;}
</style>