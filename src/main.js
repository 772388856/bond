import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/'
import store from './store/'
import {routerMode} from './config/env'

Vue.config.productionTip = false

Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    mode: routerMode
})

// router.beforeEach((to, from, next) => {
// 	if(router.app.$store.state.adminInfo.userId){
// 		next();
// 	}else{
// 		next({ path: '/login' });
// 	}
// });

new Vue({
	router,
	store
}).$mount('#app')
