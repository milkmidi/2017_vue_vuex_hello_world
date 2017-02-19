
console.log( 'process.env.NODE_ENV', process.env.NODE_ENV );
console.log( '__DEV__', __DEV__ );

import store from "./store/store";
import router from './main.router';
import App from "App.vue";

new Vue( {
    el: '#app',
    store,
    router,
    // components: { 'app': require( 'App' ) },
    // 直接取代 html #app
    render: h => h( App )    
});
