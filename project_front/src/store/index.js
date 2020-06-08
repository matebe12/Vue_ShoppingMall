import Vue from 'vue';
import Vuex from 'vuex';
import user from './User/User.js';
import Goods_Category from './Goods/Goods_Category.js';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {},
  actions: {},
  modules: { user, Goods_Category },
});
