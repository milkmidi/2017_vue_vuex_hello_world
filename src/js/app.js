import Vue from 'vue';
import App from '@/component/App.vue';

import store from './store';
import router from './app.router';
import './util/init';


export default new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
