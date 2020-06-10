import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookie from 'js-cookie';
//import store from '@/store/index.js';
Vue.use(VueRouter);
const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/User/SignUp.vue'),
  },
  {
    path: '/login',
    name: 'signup',
    component: () => import('@/views/User/Login.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Admin/Admin.vue'),
    beforeEnter: (to, from, next) => {
      // 관리자가 아닐 경우 리다이렉트
      console.log(JSON.parse(Cookie.get('user')));
      if (Cookie.get('token') != null && Cookie.get('user') != null) {
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
  routes,
});

export default router;
