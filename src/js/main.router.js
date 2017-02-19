var log = function(value) {
    console.log("%c" + value, 'background: #bdc3c7; color: black; font-size:10px;');
};
import store from './store/store';

const router = new VueRouter( {
    // mode: 'history',
    routes: [
        { path: '/', component: require( "Index" ) },
        { path: '/index', component: require( "Index" )  },
        { path: '/about', component: require( "About" ), meta: { authorization: true }  },
        { path: '/login', component: require( "Login" ) },
    ]
});

router.beforeEach(( to, from, next ) => {
    log( `Router beforeEach to: ${to.path} from: ${from.path}` );

    if ( to.matched.some( function ( record ) {
        return record.meta.authorization || false;
    }) ) {
        var isLogin = store.state.isLogin;
        if ( isLogin ) {
            next();
        } else {
            next( { path: "/login", query: { redirect: to.fullPath } });
        }
    } else {
        next();
    }
});
/*router.afterEach( route => {
    log( "Router afterEach " + route.path );
});*/
export default router;
