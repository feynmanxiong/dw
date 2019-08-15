import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const state={
    id:null

}
const mutations={
    changeId(state,id){
        state.id=id;
    }
}
const actions={
    changeFunc(context,n){
        context.commit("changeId",n)
    }
}
export default new Vuex.Store({
    state,
    mutations,
    actions
})