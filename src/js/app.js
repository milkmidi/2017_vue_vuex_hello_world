import Vue from 'vue';
// import App from '@/component/App.vue';
import App from '@/container/TestScene';

// import store from './store';
// import router from './app.router';
import './util/init';

// Vue.config.debug = process.env.NODE_ENV === 'development';
// Vue.config.devtools = true;
export default new Vue({
  el: '#app',
  // store,
  // router,
  render: h => h(App),
});
