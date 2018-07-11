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

new Vue({
	router,
	store
}).$mount('#app')
