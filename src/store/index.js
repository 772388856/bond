import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from '../api/getData'

Vue.use(Vuex)

const state = {
	adminInfo: {
		userId: '',
		userName: '',
		permissions: []
	}
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		for (var key in adminInfo){
			state.adminInfo[key] = adminInfo[key];
		}
	}
}

const actions = {
	async setAdminData({commit}, adminInfo){
		commit('saveAdminInfo', adminInfo);
	},
	async getAdminData({commit}, callback){
		const res = await getAdminInfo()
		if(res.statusError && res.status != 200){
			layer.msg('出现异常');
			return false;
		}

		if (res.responseCode == 20000) {
			commit('saveAdminInfo', res.data);
			callback && callback();
		}else{
			//this.$router.push('/login');
			throw new Error(res)
		}
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})