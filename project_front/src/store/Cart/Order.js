import { getOrderList } from '@/api/Cart';
const state = {
  order: [],
};

const mutations = {
  getOrderList(state, data) {
    state.order = data.data.results;
  },
};

const actions = {
  async getOrderList(context, data) {
    try {
      const response = await getOrderList(data);
      context.commit('getOrderList', response);
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
