import Vue from 'vue';
import Vuex from 'vuex';
import user from './User/User.js';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {},
  actions: {},
  modules: { user },
});
