import Vue from 'vue';
import VueRouter from 'vue-router';
import { getInstance } from '../auth/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { path: '/list', query: { page: 1 } },
  },
  {
    path: '/list',
    name: 'List',
    meta: { breadCrumb: 'Пошук' },
    props: (route) => ({ query: route.query.page }),
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/add',
    name: 'Import',
    meta: { breadCrumb: 'Добавити члена' },
    component: () => import('@/views/Import.vue'),
  },
  {
    path: '/member/:id',
    name: 'Member',
    meta: { breadCrumb: 'Член' },
    props: true,
    component: () => import('@/views/Member.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const authService = getInstance();
  const auth = () => {
    // If the user is authenticated, continue with the route
    if (authService.isAuthenticated) {
      return next();
    }
    // Otherwise, log in
    authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
  };
  // If loading has already finished, check our auth state using `fn()`
  if (!authService.loading) {
    return auth();
  }
  // Watch for the loading property to change before we check isAuthenticated
  authService.$watch('loading', (loading) => {
    if (loading === false) {
      return auth();
    }
  });
});

export default router;
