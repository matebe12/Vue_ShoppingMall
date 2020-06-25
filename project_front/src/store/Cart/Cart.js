import { getCartList, deleteCart } from '@/api/Cart';
const state = {
  cart: [],
};

const mutations = {
  getCartList(state, data) {
    state.cart = data.data.results;
  },
};

const actions = {
  async getCartList(context, data) {
    try {
      const response = await getCartList(data);
      context.commit('getCartList', response);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteCart(context, data) {
    try {
      const response = await deleteCart(data);
      return response;
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
