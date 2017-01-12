var log = function(value) {
    console.log("%c" + value, 'background: #bdc3c7; color: black; font-size:10px;');
};


const router = new VueRouter( {
    // mode: 'history',
    routes: [
        { path: '/', component: require( "Index" ) },
        { path: '/index', component: require( "Index" ) },
        { path: '/child', component: require( "Child" ) },
        { path: '/youtube', component: require( "YoutubeDemo" ) },        
        // { path: '/youtube', component: require( "YoutubeDemo" ), meta: { authorization: true } },        
        { path: '/login', component: require( "Login" ) },        
    ]
});

// vue router issues
// https://github.com/vuejs/vue-router/issues/853
router.beforeEach(( to, from, next ) => {
    log( "Router beforeEach " + 'to:' + to.path + ' name:' + to.name + ' from:' + from.path );
    
    if ( to.matched.some( function ( record ) {
        return record.meta.authorization || false;
    }) ) {
        var isLogin = false;
        if (isLogin) { // login
            next();    
        } else {
            next( { path: "/login", query: {redirect:to.fullPath}} );
        }
        
    } else {
        next();
    }
});
router.afterEach( route => {
    log( "Router afterEach " + route.path );
});

export default router;
