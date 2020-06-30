import { getGoodsList, getGoodsOne, getGoodsListCount } from '@/api/Goods.js';
const state = {
  goods: [],
  total: 0,
};

const mutations = {
  getGoodList(state, data) {
    state.goods = data.data.results;
  },
  getGoodOne(state, data) {
    state.goods = data.data.results;
  },
  getGoodListCount(state, data) {
    state.total = data.data.results2[0].COUNT;
  },
};

const actions = {
  async getGoodList(context, data) {
    try {
      const response = await getGoodsList(data);
      console.log(response);

      context.commit('getGoodList', response);
    } catch (error) {
      console.log(error);
    }
  },
  async getGoodOne(context, data) {
    try {
      const response = await getGoodsOne(data);
      context.commit('getGoodOne', response);
    } catch (error) {
      console.log(error);
    }
  },
  async getGoodListCount(context, data) {
    try {
      const response = await getGoodsListCount(data);
      console.log(response);

      context.commit('getGoodListCount', response);
    } catch (error) {
      console.log(error);
    }
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
