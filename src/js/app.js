import Vue from 'vue';
// import App from '@/component/App.vue';
import App from '@/container/TestContainer';

// import store from './store';
// import router from './app.router';
// import './util/init';

/**
 * @return {MyObject}
 */
export function test() {
  return {};
}

export default new Vue({
  el: '#app',
  // store,
  // router,
  render: h => h(App),
});
