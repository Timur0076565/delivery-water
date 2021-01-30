import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		order: {
			orderId: "221",
			price: 220,
			product: "Бутыль 18,9 л",
			quantity: 1,
			date: "12 февраля",
			time: "10:00 - 11:00",
			adress: "г. Самара, ул. Спортивная 24, офис 305",
			phone: "+7 (905) 606-40-04",
		},
	},
	actions: {
		CREATE_ORDER({ commit }, data) {
			commit('SET_ORDER', data)
		}
	},
	mutations: {
		SET_ORDER(state, data) {
			state.order = data
		}
	}
})