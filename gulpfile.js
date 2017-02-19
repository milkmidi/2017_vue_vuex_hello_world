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

gulp.task( 'rimraf', ( cb ) => {    
    console.log( 'rimraf' );    
    rimraf( './dist', cb );    
});


gulp.task( 'webpack-dev-server', ( cb ) => {
    logDevelopment();
    var HOST = 'localhost';
    var PORT = 3000;
    var URI = `http://${HOST}:${PORT}/`;
    process.env.NODE_ENV = 'development';
    var config = require( './webpack.config' );
    for ( let a in config.entry ) {
        config.entry[ a ].unshift( `webpack-dev-server/client?${URI}` , 'webpack/hot/dev-server' );
    }
    var server = new WebpackDevServer( webpack( config ), config.devServer );
    server.listen( PORT, HOST, ( err  ) => {
        if ( err )
            console.error( err );
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