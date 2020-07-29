import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookie from 'js-cookie';
import store from '@/store/index.js';
import Validation from '@/util/data/Validation.js';
Vue.use(VueRouter);
const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/User/SignUp.vue'),
    beforeEnter: (to, from, next) => {
      if (Cookie.get('token') == null || Cookie.get('user') == null) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '*',
    name: 'error',
    component: () => import('@/components/common/error.vue'),
  },
  {
    path: '/',
    name: 'main',
    beforeEnter: (to, from, next) => {
      next({
        path: '/shop/list/:category',
        query: {
          scode: '',
          page: 1,
          pageStart: 0,
          perPageNum: 10,
          t: new Date().getTime(),
        },
      });
    },
  },
  {
    path: '/shop/list/:category',
    name: 'shopList',
    component: () => import('@/components/main/FeaturedItem.vue'),
    beforeEnter: (to, from, next) => {
      next();
    },
  },
  {
    path: '/cart/list',
    name: 'cart',
    component: () => import('@/views/shop/Cart.vue'),
    beforeEnter: (to, from, next) => {
      if (!Validation.isNull(store.state.user.USER_ID)) {
        alert('로그인을 해주세요.');
        next('/login');
      } else {
        next();
      }
    },
  },

  {
    path: '/order/list',
    name: 'order',
    component: () => import('@/components/Cart/OrderList.vue'),
    beforeEnter: (to, from, next) => {
      if (!Validation.isNull(store.state.user.USER_ID)) {
        alert('로그인을 해주세요.');
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/shop/view/:gds_num',
    name: 'ShowDetailView',
    component: () => import('@/views/shop/GoodsView'),
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/User/Login.vue'),
    beforeEnter: async (to, from, next) => {
      if (store.state.user.USER_ID == '') {
        next();
      } else {
        alert('이미 로그인 정보가 있습니다.');
        next('/');
      }
    },
  },
  {
    path: '/forgotPw',
    name: 'forgotPw',
    component: () => import('@/views/User/forgotPw.vue'),
    beforeEnter: async (to, from, next) => {
      if (store.state.user.USER_ID == '') {
        next();
      } else {
        alert('이미 로그인 정보가 있습니다.');
        next('/');
      }
    },
  },

  {
    path: '/admin',
    name: 'admin',
    children: [
      {
        path: 'goodsList',
        name: 'goodsList',
        component: () => import('@/components/Admin/GoodsList.vue'),
        beforeEnter: async (to, from, next) => {
          next();
        },
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
      {
        path: 'orderList',
        name: 'orderList',
        component: () => import('@/components/Admin/OrderList.vue'),
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
        next('/');
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

router.beforeEach(async function(to, from, next) {
  if (to.name == 'login' || to.name == 'admin' || to.name == 'signup') {
    store.state.isView = false;
  } else {
    store.state.isView = true;
  }
  if (
    !Validation.isNull(store.state.category.category) ||
    Validation.isLength(store.state.category.category, 1)
  )
    await store.dispatch('getCategoryList');
  if (store.state.user.USER_ID != '') {
    await store.dispatch('getCartList', store.state.user.USER_ID);
  }
  next();
});

export default router;
