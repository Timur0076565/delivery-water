import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		order: {
			orderId: "221",
			price: "220,00",
			product: "Бутыль 18,9 л",
			quantity: 1,
			date: "12 февраля",
			time: "10:00 - 11:00",
			adress: "г. Самара, ул. Спортивная 24, офис 305",
			phone: "+7 (905) 606-40-04",
		},
	},
	getters: {
		// LOGIN_VALIDATION(state) {
		// 	return state.loginValidation
		// }
	},
	actions: {
		// async CHECK_LOGIN(context, argument) {
		// 	await context.commit('CHECK_LOGIN', argument)
		// }
	},
	mutations: {
		// CHECK_LOGIN(state, argument) {
		// 	if (argument[0] === state.userEmail && argument[1] === state.userPassword) {
		// 		argument[2].push({ name: 'dashboard' })
		// 	}
		// 	state.loginValidation = true;
		// }
	}
})