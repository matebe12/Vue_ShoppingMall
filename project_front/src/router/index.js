import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookie from 'js-cookie';
import store from '@/store/index.js';
Vue.use(VueRouter);
const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/User/SignUp.vue'),
  },
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/index/main.vue'),
  },
  {
    path: '/shop/list/:category',
    name: 'shopList',
    component: () => import('@/views/shop/shopList.vue'),
    beforeEnter: (to, from, next) => {
      console.log(to.query.code);
      store.dispatch('getGoodList', to.query.code);
      //getGoodsList(to.query.code);
      next();
    },
  },
  {
    path: '/cart/list',
    name: 'cart',
    component: () => import('@/views/shop/Cart.vue'),
    beforeEnter: (to, from, next) => {
      //console.log(to.params.user_id);
      store.dispatch('getCartList', 'matebe12');
      next();
    },
  },
  {
    path: '/shop/view/:gds_num',
    name: 'ShowDetailView',
    component: () => import('@/views/shop/GoodsView'),
    beforeEnter: (to, from, next) => {
      console.log(to.params.gds_num);

      store.dispatch('getGoodOne', to.params.gds_num);
      next();
    },
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/User/Login.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Admin/Admin.vue'),
    beforeEnter: (to, from, next) => {
      // 관리자가 아닐 경우 리다이렉트
      //console.log(JSON.parse(Cookie.get('user')));
      if (Cookie.get('token') != null || Cookie.get('user') != null) {
        if (Cookie.get('verify') == 9) {
          return next();
        } else {
          alert('권한이 없습니다');
          next('/');
        }
      } else {
        alert('로그인 정보가 없습니다.');
        next('/login');
      }

      console.log('cookie token : ' + Cookie.get('token'));
      // if (store.state.user.USER_VERIFY != 9 || !store.state.user) {
      //   console.log('cookie token : ' + VueCookie.get('token'));
      //   next('/login');
      // }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(function(to, from, next) {
  if (to.name == 'login' || to.name == 'admin' || to.name == 'signup') {
    store.state.isView = false;
  } else {
    store.state.isView = true;
  }
  next();
});

export default router;
