import Vue from 'vue'
import Vuex from 'vuex'

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
	async getAdminData({commit}, adminInfo){
		commit('saveAdminInfo', adminInfo);
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})