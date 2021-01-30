import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from "./store";

require('@/assets/styles/styles.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  components: { App },
  template: '<App/>',
})
