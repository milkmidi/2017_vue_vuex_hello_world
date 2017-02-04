
console.log( 'process.env.NODE_ENV', process.env.NODE_ENV );

import store from "./vuex/store";
import router from './main.router';
import App from "App.vue";

new Vue( {
    el: '#app',
    store,
    router,
    // components: { 'app': require( 'App' ) },
    // 直接取代 html #app
    render: h => h( App )
    // 如果 App 想要吃到 props 的話就用下面的寫法
    /*render: h => {
        return h( App, { props: {appData:'fasdfasdfoo'}} );
    }*/
});

console.log( "foobar".includes( "foo" ) );
