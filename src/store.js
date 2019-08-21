import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const state={
    id:null,
    businessModule:[]
}
const mutations={
    changeId(state,id){
        state.id=id;
    },
    getBusinessModule(state,list){
        state.businessModule=list;
    }
}
const actions={
    changeFunc(context,n){
        context.commit("changeId",n)
    },
    getBusinessModuleFunc(context,n){
        context.commit("getBusinessModule",n)
    }
}
export default new Vuex.Store({
    state,
    mutations,
    actions
})