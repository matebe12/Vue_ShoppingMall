import { getCategoryList } from '@/api/Goods.js';
const state = {
  category: [
    {
      CATEGORY_NAME: String,
      CATEGORY_CODE: Number,
      CATEGORY_REF: Number,
      CATEGORY_LEVEL: Number,
    },
  ],
};

const mutations = {
  getCategoryList(state, data) {
    state.category = data.data;
  },
};

const actions = {
  async getCategoryList(context, data) {
    try {
      const response = await getCategoryList(data);
      context.commit('getCategoryList', response);
    } catch (error) {
      alert(error);
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
