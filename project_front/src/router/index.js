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
    beforeEnter: (to, from, next) => {
      store.state.loading = true;
      store.dispatch('getCategoryList');
      store.state.loading = false;
      next();
    },
  },
  {
    path: '/shop/list/:category',
    name: 'shopList',
    component: () => import('@/components/main/FeaturedItem.vue'),
    beforeEnter: (to, from, next) => {
      let reqData = {};
      reqData.CATEGORY_REF = to.query.fcode;
      reqData.CODE = to.query.scode;
      reqData.PAGE = to.query.page *= 1; // 페이지 정보
      reqData.PAGE_START = (reqData.PAGE - 1) * 10; // 보여줄 상품 시작
      reqData.PER_PAGE_NUM = 10; // 보여줄 상품 수
      reqData.ORDER = 'newItem';
      store.dispatch('getGoodListCount', reqData);
      store.dispatch('getGoodList', reqData);
      //getGoodsList(to.query.code);
      next();
    },
  },
  {
    path: '/cart/list',
    name: 'cart',
    component: () => import('@/views/shop/Cart.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('getCartList', store.state.user.USER_ID);
      next();
    },
  },
  {
    path: '/order/list',
    name: 'order',
    component: () => import('@/components/Cart/OrderList.vue'),
    beforeEnter: (to, from, next) => {
      store.state.loading = true;
      console.log(store.state.user.USER_ID);

      store.dispatch('getOrderList', store.state.user.USER_ID);
      store.state.loading = false;
      next();
    },
  },
  {
    path: '/shop/view/:gds_num',
    name: 'ShowDetailView',
    component: () => import('@/views/shop/GoodsView'),
    beforeEnter: async (to, from, next) => {
      store.state.loading = true;
      await store.dispatch('getGoodOne', to.params.gds_num);
      store.state.loading = false;
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
    children: [
      {
        path: 'goodsList',
        name: 'goodsList',
        component: () => import('@/components/Admin/GoodsList.vue'),
      },
      {
        path: 'userList',
        name: 'userList',
        component: () => import('@/components/Admin/UserList.vue'),
      },
      {
        path: 'registGoods',
        name: 'registGoods',
        component: () => import('@/components/Admin/GoodsRegister.vue'),
      },
    ],
    component: () => import('@/views/Admin/Admin.vue'),
    beforeEnter: (to, from, next) => {
      const checkAdmin = isAdmin();
      if (checkAdmin.isAdmin && checkAdmin.isLogin) {
        next();
      } else if (!checkAdmin.isAdmin && checkAdmin.isLogin) {
        next('/');
      } else {
        next('/login');
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

function isAdmin() {
  // 관리자가 아닐 경우 리다이렉트
  let check = {};
  if (Cookie.get('token') != null || Cookie.get('user') != null) {
    if (Cookie.get('verify') == 9) {
      check.isAdmin = true;
      check.isLogin = true;
      return check;
    } else {
      alert('권한이 없습니다');
      check.isAdmin = false;
      check.isLogin = true;
      return false;
    }
  } else {
    alert('로그인 정보가 없습니다.');
    check.isAdmin = false;
    check.isLogin = false;
    return check;
  }

  // if (store.state.user.USER_VERIFY != 9 || !store.state.user) {
  //   next('/login');
  // }
}

router.beforeEach(function(to, from, next) {
  if (to.name == 'login' || to.name == 'admin' || to.name == 'signup') {
    store.state.isView = false;
  } else {
    store.state.isView = true;
  }
  store.dispatch('getCategoryList');
  next();
});

export default router;
