// What's new in webpack 2
// https://gist.github.com/sokra/27b24881210b56bbaff7
// https://webpack.js.org/
var path = require( "path" ),
    webpack = require( 'webpack' ),
    chalk = require( 'chalk' ),
    ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');
var DEV_MODE = process.env.NODE_ENV === 'development';
var colorFun;
if( DEV_MODE ){
    colorFun = chalk.black.bgYellow;
}else{
    colorFun = chalk.bgCyan.white;
}
console.log( colorFun( 'DEV_MODE = ' + DEV_MODE ) );
console.log( colorFun( 'process.env.NODE_ENV = ' + process.env.NODE_ENV ) );

var config = {
    context: path.resolve( 'src' ),
    entry: {
        app: [ './js/main.js' ],// 這裡要放 Array , 因為在 gulp 時會動態加入 hotreload 的 js
    },
    output: {
        filename: "asset/js/[name].js?[hash]",
        path: path.resolve( __dirname, './dist' ),
        publicPath: '',
    },
    resolveLoader: {
        moduleExtensions: [ "-loader" ],
    },
    resolve: {
        alias: {
            // 'vue$': 'vue/dist/vue.common.js'
        },
        modules:[
            path.resolve( 'src/vue' ),
            path.resolve( 'src/html' ),
            path.resolve( 'src/img' ),
            path.resolve( 'src/css' ),
            path.resolve( 'src/asset' ),
            path.resolve( 'src/js' ),
            path.resolve( 'src' ),
            path.resolve( "node_modules"),
        ],
        extensions: [ ".js", ".vue", ".scss", ".stylus" ]// 2.x 第一筆不用放空串字
    },
    // https://webpack.js.org/configuration/dev-server/#devserver
    devServer: {
        historyApiFallback: false,
        noInfo: true,
        hot: true,
        inline: true,
        // https://webpack.js.org/configuration/stats/
        stats: {
            colors: true,
            hash: false, // add the hash of the compilation
            version: false, // add webpack version information
            timings: true, // add timing information
            assets: true, // add assets information
            chunks: false, // add chunk information
            chunkModules: false, // add built modules information to chunk information
            modules: false, // add built modules information
            cached: false, // add also information about cached (not built) modules
            reasons: false, // add information about the reasons why modules are included
            source: false, // add the source code of modules
            error: true,
            errorDetails: true, // add details to errors (like resolving log)
            chunkOrigins: false // add the origins of chunks and chunk merging info
        }
    }
};
config.module = {
    // 1.x:loaders ,  2.x:rules
    // https://webpack.js.org/configuration/module/#module-rules
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            include: path.resolve( 'src/vue' ),
            exclude: /node_modules/,
            options: {
                // https://github.com/vuejs/vue-loader/blob/master/docs/en/features/postcss.md
                postcss: [
                    require( 'autoprefixer' )( {
                        browsers: [ "last 5 version", "iOS >=8", "Safari >=8" ],
                    }),
                    require( 'cssnano' )( {
                        zindex: false,
                        calc: false,
                        reduceIdents: false,
                    }),
                ],
            }
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [
                path.resolve( 'src/js' ),
                path.resolve( 'src/lib' )
            ],
            exclude: /node_modules/
        },
        {
            test: /\.(png|jpg|gif|svg|ico)$/,
            include: path.resolve( 'src/img' ),
            loader: 'url-loader',
            exclude: /node_modules/,
            options: {
                limit: 1024,
                name: "asset/[path][name].[ext]?[hash:8]"
            }
        },
    ]
};

config.plugins = [
    new HtmlWebpackPlugin({
        minify: false,
        xhtml: true,
        template: 'pug-loader?pretty=false!src/html/index.pug',        
    }),
    new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
    }),
    new webpack.DefinePlugin( {
        __DEV__: DEV_MODE,
        'process.env.NODE_ENV': DEV_MODE ? "'development'" : '"production"'
    }),
    //  http://vue-loader.vuejs.org/en/workflow/production.html
    ...DEV_MODE ? [] : [
        new webpack.optimize.UglifyJsPlugin( {
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        // optimize module ids by occurence count
        // 以下這個還不知道要做什麼
        new webpack.LoaderOptionsPlugin( {
            test: /\.css$/, // optionally pass test, include and exclude, default affects all loaders
            minimize: true,
            debug: false,
            options: {
            }
        })
    ]
];


 // 不要將這裡打包到你的 js 檔裡, 可以用 extensions ，然後自己 script src, 或是用 addVendor 的方法，二選一
config.externals = {
    'jquery': '$',
    'vue': 'Vue',
    'vuex': 'Vuex',
    'axios': 'axios',
    'vue-router': 'VueRouter'
};
module.exports = config;