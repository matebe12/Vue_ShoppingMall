import { getCategory } from '@/api/Goods.js';
const state = {
  first_Cate: [],
};

const mutations = {
  setCategory(state, data) {
    state.first_Cate = [];
    console.log('category mutation');
    console.log(data.results.length);
    state.first_Cate.push(data.results);
  },
};

const actions = {
  async getHighCategory({ commit }) {
    const { data } = await getCategory();
    commit('setCategory', data);
    return data;
  },
};

export default {
  state,
  mutations,
  actions,
};
