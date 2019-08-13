<template>
    <div class="box">
        <el-dialog title="" :visible.sync="dialogVisible" fullscreen :modal="true" :append-to-body="true">
            <el-steps :active="active"  class="steps" align-center finish-status="success">
                <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
            </el-steps>

        </el-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                dialogVisible:false,
                active:2,//步骤条
			}
        },
		methods:{
			showAndHideDialog(){
				this.dialogVisible=!this.dialogVisible;
			}
		}
    }
</script>
<style scoped>
    .steps{margin-top:10px;}
</style>