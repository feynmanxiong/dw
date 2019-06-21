<template>
	<el-container class="flex_col_str relative login_bg">
		<div class="login_box">
			<div class="login_text">
				<p class="login_text1">用户登录</p>
				<p class="login_text2">USER LOGIN</p>
			</div>
			<el-form ref="login" label-width="70px" :model="form" size="mini" :rules="rules">
				<el-form-item label="" prop="username">
					<div class="form_icon">
						<img class="icon_user" src="../../assets/user.png"/>
						<span class="span_1">用户名：</span>
					</div>
					<el-input class="form_input1" v-model="form.username" @keyup.enter.exact.native="login"></el-input>
				</el-form-item>
				<el-form-item label="" prop="password">
					<div class="form_icon">
						<img class="icon_key" src="../../assets/key.png"/>
						<span class="span_2">密&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
					</div>
					<el-input class="form_input2" type="password" v-model="form.password" @keyup.enter.exact.native="login" show-password></el-input>
					<el-button class="btn_1" type="text">忘记密码？</el-button>
				</el-form-item>
				<el-form-item>
					<el-button class="btn_2" type="" @click="login" >登　录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</el-container>
</template>

<style scoped>
	.flex_col_str { height: 100%;}
	.login_bg{ width: 100%; height: 100%; background: url('../../assets/bg_2.png') center ; background-size: cover;}
	.login_box{ width: 550px;height:520px; position: absolute; top:50%; right: 0; transform: translate(-50%, -50%);  padding: 18px 18px 0; border-radius: 5px; }
	.login_text{margin:0 0 50px 70px;}
	.login_text1{color:#4452d5;font-size:32px;}
	.login_text2{color:#a9a9a9;font-size:20px;}
	.form_input1,.form_input2{padding-right:30px;width:500px;height:45px;padding-left:110px;position:relative;font-size:16px;color:#333333;line-height: 45px;border:none;background-color:#FFFFFF !important}
	.form_input1{margin-bottom: 10px;}
	.icon_user,.icon_key{width:25px;height:25px;position:absolute;top:10px;left:5px;}
	.form_icon{position:absolute;top:-1px;left:5px;z-index: 999;}
	.form_icon span{font-size:16px;}
	.span_1,.span_2{position:absolute;top:8px;left:40px;width:120px;display: inline-block;}
	.btn_1{font-size:14px;color:#4452d5;}
	.btn_2{width:500px;color:white; height:45px;line-height: 30px;font-size:18px;text-align: center;margin-top:30px;background-color:#4452d5;border:none;}
	.el-input__inner {width:450px; border: none; font-size: inherit; outline: 0; padding: 0 15px; }
</style>

<script>
	export default {
		data() {
			return {
				rules: {
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				form : {
					username : "admin",
					password : "111111",
					company : "zY5Gl",
				}
			}
		},
		created() {
		},
		methods: {
			login(){
				let self = this;
				this.$refs.login.validate((valid) => {
					if (valid) {
						this.$login(this.form);
						// axios.post('/admin.login',this.form).then((response) => {
						// 	if (response.data.code == 0) {
						// 		localStorage.setItem("dw_erp_user_name",response.data.data.name);
						// 		localStorage.setItem("dw_erp_user_username",response.data.data.username);
						// 		localStorage.setItem("dw_erp_user_token",response.data.data.token);
						// 		self.$router.replace("/console");
						// 	}
						// }).catch((error) => {
						// 	console.log(error);
						// })
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		}
	}
</script>
