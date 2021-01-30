import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: '/delivery-water/',
	routes: [
		{
			path: '/',
			name: 'createOrder',
			component: () => import('./views/CreateOrder.vue')
		},
		{
			path: '/completed-order',
			name: 'completedOrder',
			component: () => import('./views/CompletedOrder.vue')
		},
	]
})
export default router