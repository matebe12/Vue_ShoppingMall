import { getCartList } from '@/api/Cart';
const state = {
  cart: [
    {
      CART_NUM: Number,
      USER_ID: String,
      GDS_NUM: Number,
      CART_STOCK: Number,
      CART_ADD_DATE: String,
      GDS_STOCK: Number,
      GDS_IMG: String,
      GDS_NAME: String,
      GDS_PRICE: Number,
    },
  ],
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
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
