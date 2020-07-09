import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Spinner from '@/components/common/Spinner.vue';
import excel from 'vue-excel-export';
Vue.component('Spinner', Spinner);
Vue.use(excel);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
