import { getOrderList, updateOrderList, deleteOrderList } from '@/api/Cart';
const state = {
  order: [],
  total: 0,
};

const mutations = {
  getOrderList(state, data) {
    state.order = data.data.results1;
    state.total = data.data.results2[0].TOTAL_COUNT;
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
  async updateOrderList(context, data) {
    try {
      await updateOrderList(data);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteOrderList(context, data) {
    try {
      await deleteOrderList(data);
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
