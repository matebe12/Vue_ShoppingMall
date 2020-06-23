import Vue from 'vue';
import Vuex from 'vuex';
import user from './User/User.js';
import goods from './Goods/Goods.js';
import cart from './Cart/Cart.js';
import category from './Category/Category.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isView: false,
  },
  mutations: {},
  actions: {},
  modules: { user, goods, cart, category },
});
