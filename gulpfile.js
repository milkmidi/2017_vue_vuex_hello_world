var gulp = require( 'gulp' ),
    gutil = require( "gulp-util" ),
    webpack = require( 'webpack' ),
    WebpackDevServer = require( 'webpack-dev-server' ),
    runSequence = require( 'run-sequence' ),
    rimraf = require( 'rimraf' ),
    chalk = require( 'chalk' );

function logDevelopment() {
    var str = `
    ########  ######## ##     ##
    ##     ## ##       ##     ##
    ##     ## ##       ##     ##
    ##     ## ######   ##     ##
    ##     ## ##        ##   ##
    ##     ## ##         ## ##
    ########  ########    ###
    `;
    console.log( chalk.black.bgYellow( str ) );
}
function logProduction() {
    var str = `
    ########  ########   #######
    ##     ## ##     ## ##     ##
    ##     ## ##     ## ##     ##
    ########  ########  ##     ##
    ##        ##   ##   ##     ##
    ##        ##    ##  ##     ##
    ##        ##     ##  #######   `;
    console.log( chalk.bgCyan.white.bold( str ) );
}

gulp.task( 'rimraf', ( cb )=> {
    console.log( 'rimraf' );
    rimraf( './dist', cb );
});


gulp.task( 'webpack-dev-server', ( cb ) => {
    logDevelopment();
    var host = 'localhost';
    var port = 3000;
    var URI = `http://${host}:${port}/`;    
    process.env.NODE_ENV = 'development';
    var config = require( './webpack.config' );
    // config.devtool = 'cheap-module-eval-source-map'; // 這會抓到 mixin 裡的路徑
    config.devtool = "inline-source-map";   // 要用這個才會對
    for ( let a in config.entry ) {
        config.entry[ a ].unshift( `webpack-dev-server/client?${URI}` , 'webpack/hot/dev-server' );
    }
    var server = new WebpackDevServer( webpack( config ), config.devServer );
    server.listen( port, host, ( err  ) => {
        if ( err )
            console.log( err );
        gutil.log( "[webpack-dev-server]", URI );
        cb();
    });
});

gulp.task( 'webpack-build',( cb ) => {
    logProduction();
    process.env.NODE_ENV = 'production';
    var config = require( './webpack.config' );
    webpack( config, ( err, stats ) => {
        if ( err ) {
            throw new gutil.PluginError( "webpack", err );
        }
        gutil.log( "[webpack]", stats.toString( { colors: true, chunkModules: false }) );
        cb();
    });
});


gulp.task( 'p', () => runSequence( 'rimraf', 'webpack-build' ) );
gulp.task( 'd', ['webpack-dev-server' ] );
gulp.task( 'default', ['webpack-dev-server' ] );