import Cookie from 'js-cookie';
const state = {
  USER_ID: JSON.parse(Cookie.get('user')).USER_ID,
  USER_PHONE: JSON.parse(Cookie.get('user')).USER_PHONE,
  USER_VERIFY: JSON.parse(Cookie.get('user')).USER_VERIFY,
};

const mutations = {
  logout(state) {
    state.USER_ID = '';
    state.USER_PHONE = '';
    state.USER_VERIFY = '';

    Cookie.remove('token');
    Cookie.remove('user');
    Cookie.remove('verify');
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
