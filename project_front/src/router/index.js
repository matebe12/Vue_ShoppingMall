import Vue from 'vue';
import VueRouter from 'vue-router';

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
];

const router = new VueRouter({
  routes,
});

export default router;
