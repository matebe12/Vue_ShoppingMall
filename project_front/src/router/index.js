import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
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
      console.log(store.state.user.USER_VERIFY);
      if (store.state.user.USER_VERIFY != 9 || !store.state.user) {
        next('/login');
      }
      next();
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
