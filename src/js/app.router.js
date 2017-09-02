/* eslint no-console: 0 */
import VueRouter from 'vue-router';
import Vue from 'vue';

import Main from '@/component/Main.vue';

import store from './store';


Vue.use(VueRouter);
const About = () => import(/* webpackChunkName: "About" */'./component/About.vue');
const Login = () => import(/* webpackChunkName: "Login" */'./component/Login.vue');
const VueClass = () => import(/* webpackChunkName: "VueClass" */'./component/VueClass.vue');

const log = value => console.log(`%c${value}`, 'background: #bdc3c7; color: black; font-size:10px;');


const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Main },
    { path: '/about', component: About, meta: { authorization: true } },
    { path: '/login', component: Login },
    { path: '/VueClass', component: VueClass },
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
