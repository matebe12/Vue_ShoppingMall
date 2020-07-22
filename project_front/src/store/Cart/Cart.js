import { getCartList, deleteCart } from '@/api/Cart';
const state = {
  cart: [],
};

const mutations = {
  getCartList(state, data) {
    state.cart = data.data;
  },
};

const actions = {
  async getCartList(context, data) {
    try {
      const response = await getCartList(data);
      context.commit('getCartList', response);
    } catch (error) {
      alert(error);
    }
  },
  async deleteCart(context, data) {
    try {
      const response = await deleteCart(data);
      return response;
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
