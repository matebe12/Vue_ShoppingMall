import Cookie from 'js-cookie';
import store from '@/store/index';
const state = {
  USER_ID:
    Cookie.get('user') != null ? JSON.parse(Cookie.get('user')).USER_ID : '',
  USER_NAME:
    Cookie.get('user') != null ? JSON.parse(Cookie.get('user')).USER_NAME : '',
  USER_VERIFY:
    Cookie.get('user') != null
      ? JSON.parse(Cookie.get('user')).USER_VERIFY
      : '',
};

const mutations = {
  logout(state) {
    state.USER_ID = '';
    state.USER_NAME = '';
    state.USER_VERIFY = '';

    Cookie.remove('token');
    Cookie.remove('user');
    Cookie.remove('verify');
    Cookie.remove('_karmtea');
    Cookie.remove('_karmt');
    Cookie.remove('_kawlt');
    Cookie.remove('webid');
    Cookie.remove('webid_ts');
    Cookie.remove('_TI_NID');
    Cookie.remove('_kadu');
    Cookie.remove('TIARA');

    store.state.cart.cart = null;
    store.state.order.order = null;
    window.Kakao.cleanup();
    window.Kakao.Auth.logout();
    alert('로그아웃');
  },
  login(state, data) {
    state.USER_ID = data.results[0].USER_ID;
    state.USER_NAME = data.results[0].USER_NAME;
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
