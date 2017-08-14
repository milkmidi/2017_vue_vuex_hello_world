/* eslint global-require:off , no-console:off */
import VueRouter from 'vue-router';
import Vue from 'vue';
import store from './store';

import Index from '../component/Index.vue';

Vue.use(VueRouter);
const About = () => import(/* webpackChunkName: "About" */'../component/About.vue');
const Login = () => import(/* webpackChunkName: "Login" */'../component/Login.vue');

const log = value => console.log(`%c${value}`, 'background: #bdc3c7; color: black; font-size:10px;');


const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Index },
    { path: '/index', component: Index },
    { path: '/about', component: About, meta: { authorization: true } },
    { path: '/login', component: Login },
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
