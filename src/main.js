import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
// import { Message, Loading  } from 'element-ui';
window.moment = require('moment');
window.moment.locale('zh-cn');
let axios = require('axios');

Vue.use(Tool);

import 'element-ui/lib/theme-chalk/index.css';
/**字体图标**/
import router from './router'
import './assets/app.css'
import './assets/css/font-awesome/css/font-awesome.min.css'
// iconfont图标样式
// import './assets/css/font/iconfont.css'
window.axios = require('axios');

Vue.use(ElementUI);
Vue.config.productionTip = false
import Tool from './tools.js'


window.baseURL = 'http://demu-dev.dwood365.com';
axios.defaults.baseURL = window.baseURL + '/api/v1/';
// window.baseURL = 'https://cloud-api-dev.jnqueqiao.com';
// axios.defaults.baseURL = window.baseURL + '/shop/v1/erp'
//
//axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(function(config){
	if (localStorage.hasOwnProperty('dw_erp_user_token')) {
		config.headers.Authorization = 'Bearer ' + localStorage.getItem("dw_erp_user_token");
	}
	return config;
},function(error){
		return Promise.reject(error);
});

axios.interceptors.response.use(
	response => {
		if(response.data.code != 0){
			Message({
				message: response.data.message,
				type: 'warning'
			})
		}
		return response;
	},
	error => {
	    if (error.response) {
		  console.log(error.response);
		  
	      // switch (error.response.status) {
	      //   case 400:
	      //       app.$alert('还没有登录', '请登录', {
			// 		confirmButtonText: '登录',
			// 		callback: action => {
	      //               window.top.location.replace("/")
			// 		}
			// 	});
	      //       break;
	      //   case 401:
	      //       app.$alert('您的认证信息错误，请重新登录!', '认证失败', {
			// 		confirmButtonText: '重新登录',
			// 		callback: action => {
	      //               window.top.location.replace("/")
			// 		}
			// 	});
	      //       break;
	      //   case 402:
	      //       app.$alert('您的认证信息已失效，请重新登录!', '认证失效', {
			// 		confirmButtonText: '重新登录',
			// 		callback: action => {
	      //               window.top.location.replace("/")
			// 		}
			// 	});
	      //       break;
			// case 403:
	      //       // this.$alert('您的认证信息已失效，请重新登录!', '没有权限');
			// 	app.$msgbox({
			// 		message: '没有执行该操作的权限',
			// 		type: 'warning',
			// 		duration : 1000
		  //       });
		  //       break;
		  //   }
		}
	return Promise.reject(error);   // 返回接口返回的错误信息
});

window.axios = axios;

Vue.filter("dateFormat",(date) => {
	return moment( parseInt(date) * 1000).format("YYYY-MM-DD")
})
Vue.filter("key_color",function(value){
	let str = "";
	switch (value) {
		case "operation":
		case "edit":
			str = "danger";
			break;
		case "submit":
			str = "warning";
	}
	return str;
})

const app = new Vue({
  router,
  render: h => h(App)
});
app.$mount('#app');
