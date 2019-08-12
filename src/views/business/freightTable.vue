<template>
    <div class="box">
        <el-dialog title="" :visible.sync="dialogVisible" fullscreen :modal="false">
				<el-form class="cont_top"  :inline="true" :model="params" label-position="right">
					<el-row class="cont_button cont_border operation_top">
						<el-button type="success" size="mini" @click="dialogVisible = true">新增</el-button>
						<el-button type="success" size="mini">复制</el-button>
						<el-button type="success" size="mini">保存</el-button>
						<el-button type="danger" size="mini">删除</el-button>
						<el-button type="warning" size="mini">修改历史</el-button>
						<el-button type="success" size="mini">分摊费用</el-button>
						<el-button type="success" size="mini">台账业务数据</el-button>
						<el-button type="success" size="mini">费用预录入</el-button>
						<el-button type="success" size="mini">单证管理</el-button>
						<el-button type="success" size="mini">拖车信息</el-button>
						<el-button type="success" size="mini">堆存信息</el-button>
						<el-button type="success" size="mini">打印</el-button>
					</el-row>
					<el-row class="el-m ">
						<el-form-item class="el-item" label="合同编号:">
							<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
						</el-form-item>
						<el-form-item class="el-item" label="委托日期">
							<div class="block">
								<el-date-picker v-model="value1" type="date" placeholder="选择日期" size="mini" class="date_input"> </el-date-picker>
							</div>
						</el-form-item>
						<el-form-item class="el-item" label="揽货性质:" >
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
						<el-form-item class="el-item" label="委托单位:" >
							<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="el-item" label="结算单位:" >
							<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
						</el-form-item>
					</el-row>
					<el-row>
						<strong class="el-item cont_s">合同编号与价格协议号对应关系</strong>
						<el-button type="success" size="mini" @click="centerDialogVisible = true">添加合同编号</el-button>
						<div class="cont_box">
							<el-row>
								<el-form-item class="el-item" label="">
									<el-button type="danger" size="mini">删除</el-button>
								</el-form-item>
								<el-form-item class="el-item" label="合同编号:">
									<el-input v-model="input" placeholder="合同编号" size="mini" class="date_box"></el-input>
								</el-form-item>
								<el-form-item class="el-item" label="价格协议号:">
									<el-input v-model="input" placeholder="价格协议号" size="mini" class="date_box"></el-input>
								</el-form-item>
							</el-row>
							<el-row>
								<el-form-item class="el-item" label="">
									<el-button type="danger" size="mini">删除</el-button>
								</el-form-item>
								<el-form-item class="el-item" label="合同编号:">
									<el-input v-model="input" placeholder="合同编号" size="mini" class="date_box"></el-input>
								</el-form-item>
								<el-form-item class="el-item" label="价格协议号:">
									<el-input v-model="input" placeholder="价格协议号" size="mini" class="date_box"></el-input>
								</el-form-item>
							</el-row>
							<el-row>
								<el-form-item class="el-item" label="">
									<el-button type="danger" size="mini">删除</el-button>
								</el-form-item>
								<el-form-item class="el-item" label="合同编号:">
									<el-input v-model="input" placeholder="合同编号" size="mini" class="date_box"></el-input>
								</el-form-item>
								<el-form-item class="el-item" label="价格协议号:">
									<el-input v-model="input" placeholder="价格协议号" size="mini" class="date_box"></el-input>
								</el-form-item>
							</el-row>
						</div>
					</el-row>
					<el-row>
						<el-form-item class="el-item" label="操作人:">
							<el-input v-model="input" placeholder="" size="mini" class="date_box"></el-input>
						</el-form-item>
						<el-form-item class="el-item" label="客服角色：">
							<el-input v-model="input" placeholder="" size="mini" class="date_box"></el-input>
						</el-form-item>
						<el-form-item class="el-item" label="销售角色：">
							<el-input v-model="input" placeholder="" size="mini" class="date_box"></el-input>
						</el-form-item>
					</el-row>
					<el-row>
						<span>操作时间：</span>
					</el-row>
				</el-form>
			</el-dialog>
    </div>
</template>
<style>

</style>
<script>
    export default {
        data(){
            return {
				dialogVisible:false
			}
        },
        components:{
			
		},
		methods:{
			showAndHideDialog(){
				this.dialogVisible=!this.dialogVisible;
			}
		}
    }
</script>
