import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


//start
//业务管理
Vue.component('businessFreight',() => import('./views/business/freight.vue'));
//价格管理
Vue.component('contractRun',() => import('./views/contract/run.vue'));
Vue.component('contractPrice',() => import('./views/contract/price.vue'));
//供应商管理
Vue.component('contractCost',() => import('./views/contract/cost.vue'));
Vue.component('supplierCustomer',() => import('./views/supplier/customer.vue'));
//审批管理
Vue.component('approvalContract',() => import('./views/approval/contract.vue'));
Vue.component('approvalCost',() => import('./views/approval/cost.vue'));
//基础资料    start
//基础资料=>商务基础资料  start
Vue.component('basicsMerchantInvoice',() => import('./views/basics/merchantInvoice.vue'));
Vue.component('basicsMerchantCost',() => import('./views/basics/merchantCost.vue'));
Vue.component('basicsMerchantTax',() => import('./views/basics/merchantTax.vue'));
//基础资料=>商务基础资料  end
Vue.component('basicsOrgani',() => import('./views/basics/organi.vue'));
//基础资料=>业务基础资料  start
Vue.component('basicsRecordMain',() => import('./views/basics/recordMain.vue'));
Vue.component('basicsRecordPort',() => import('./views/basics/recordPort.vue'));
Vue.component('basicsRecordRoute',() => import('./views/basics/recordRoute.vue'));
Vue.component('basicsRecordCompany',() => import('./views/basics/recordCompany.vue'));
Vue.component('basicsRecordChange',() => import('./views/basics/recordChange.vue'));
Vue.component('basicsRecordBoat',() => import('./views/basics/recordBoat.vue'));
Vue.component('basicsRecordSettle',() => import('./views/basics/recordSettle.vue'));
Vue.component('basicsRecordBoxing',() => import('./views/basics/recordBoxing.vue'));
Vue.component('basicsRecordPrinting',() => import('./views/basics/recordPrinting.vue'));
Vue.component('basicsRecordBox',() => import('./views/basics/recordBox.vue'));
Vue.component('basicsRecordProfit',() => import('./views/basics/recordProfit.vue'));
Vue.component('basicsRecordCurrency',() => import('./views/basics/recordCurrency.vue'));
Vue.component('basicsRecordPrice',() => import('./views/basics/recordPrice.vue'));
Vue.component('basicsSettle',() => import('./views/basics/settle.vue'));
//基础资料    end
//权限管理    start
Vue.component('powerUser',() => import('./views/power/user.vue'));
Vue.component('powerRole',() => import('./views/power/role.vue'));
//权限管理    end

// end
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            redirect : '/login',
            // component: Home
        },
        {
            path: '/console',
            name: 'base',
            // redirect : '/console/about',
            component: () => import(/* webpackChunkName: "about" */ './Base.vue'),
        },
        {
            path: '/login',
            name : 'login',
            component: () => import(/* webpackChunkName: "login" */ './views/login/login.vue'),
        }
    ]
})
