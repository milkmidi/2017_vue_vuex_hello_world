import Vue from 'vue';
import store from './store';
import router from './app.router';
import App from '../component/App.vue';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);


export default new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
