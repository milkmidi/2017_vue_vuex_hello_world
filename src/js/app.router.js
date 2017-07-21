/* eslint global-require:off , no-console:off */
import VueRouter from 'vue-router';
import Vue from 'vue';
import store from './store/store';

Vue.use(VueRouter);

const log = value => console.log(`%c${value}`, 'background: #bdc3c7; color: black; font-size:10px;');

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: require('../component/Index.vue') },
    { path: '/index', component: require('../component/Index.vue') },
    { path: '/about', component: require('../component/About.vue'), meta: { authorization: true } },
    { path: '/login', component: require('../component/Login.vue') },
  ],
});

router.beforeEach((to, from, next) => {
  log(`Router beforeEach to: ${to.path} from: ${from.path}`);

  if (to.matched.some(record => record.meta.authorization || false)) {
    const isLogin = store.state.isLogin;
    if (isLogin) {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } });
    }
  } else {
    next();
  }
});
export default router;
