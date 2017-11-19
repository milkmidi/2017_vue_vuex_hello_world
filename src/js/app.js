import Vue from 'vue';
// import App from '@/component/App.vue';
import App from '@/container/TestContainer';


import TestDirective from './directive/TestDirective';

// import store from './store';
// import router from './app.router';
// import './util/init';

TestDirective.install(Vue);
// Vue.config.debug = process.env.NODE_ENV === 'development';
// Vue.config.devtools = true;
export default new Vue({
  el: '#app',
  // store,
  // router,
  render: h => h(App),
});
