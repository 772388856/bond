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
// 	if(from.path.indexOf('login') != -1){
// 		next();
// 	}else{
// 		console.log(router.app.$store.state.adminInfo, router.app.$store.state.adminInfo.userId)
// 		if(router.app.$store.state.adminInfo.userId){

// 		}else{
// 			next();
// 		}
// 	}
// })

new Vue({
	router,
	store
}).$mount('#app')
