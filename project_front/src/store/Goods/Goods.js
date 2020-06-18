import { getGoodsList, getGoodsOne } from '@/api/Goods.js';
const state = {
  goods: [
    {
      GDS_NUM: Number,
      GDS_NAME: String,
      GDS_PRICE: Number,
      GDS_CATEGORY_NAME: String,
      CATEGORY_REF: String,
      GDS_CATEGORY_CODE: String,
      GDS_STOCK: String,
      GDS_DESC: String,
      GDS_IMG: String,
      GDS_DATE: String,
    },
  ],
};

const mutations = {
  getGoodList(state, data) {
    state.goods = data.data.results;
  },
  getGoodOne(state, data) {
    state.goods = data.data.results;
  },
};

const actions = {
  async getGoodList(context, data) {
    try {
      const response = await getGoodsList(data);
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
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
