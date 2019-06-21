<!--基础资料=>业务基础数据=>箱型对应关系   recordBox --> 
<template>
	<div class="container">
		<el-row class="cont_block">
			<el-button type="success" @click="add" size="mini">新增</el-button>
			<el-button type="success"  size="mini">保存</el-button>
			<el-button size="mini" type="danger" @click="handleDelete">删除</el-button>
		</el-row>
		<el-row>
			<el-table :data="tableData" border size="mini">
				<el-table-column type="selection" align="center" width="55"></el-table-column>
				<el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
				<el-table-column align="center" prop="test" label="箱型分类"></el-table-column>
				<el-table-column align="center" prop="test" label="对应的箱型"></el-table-column>
			</el-table>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				n: 1,
				tableData: [{
					id: 1,
					test: 'test'
				}]
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

<style scoped="">
	.container { padding: 10px; width:100%;}  
</style>