const state = {
  USER_ID: localStorage.getItem('USER_ID'),
  USER_PHONE: localStorage.getItem('USER_PHONE'),
  USER_VERIFY: localStorage.getItem('USER_VERIFY'),
  USER_TOKEN: localStorage.getItem('USER_TOKEN'),
};

const mutations = {
  logout(state) {
    state.USER_ID = '';
    state.USER_PHONE = '';
    state.USER_VERIFY = '';

    localStorage.removeItem('token');
    alert('로그아웃');
  },
  login(state, data) {
    state.USER_ID = data.results[0].USER_ID;
    state.USER_PHONE = data.results[0].USER_PHONE;
    state.USER_VERIFY = data.results[0].USER_VERIFY;
    return data.token;
  },
};

const actions = {};

export default {
  state,
  mutations,
  actions,
};
