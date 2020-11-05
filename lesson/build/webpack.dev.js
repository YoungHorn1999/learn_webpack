const webpack = require('webpack')
const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig = {
    mode: 'development',//代码按照开发环境进行打包，打包后的代码不会被压缩
    devtool: 'cheap-module-eval-source-map',
    //cheap：生成sourcemap的时候不带列信息，只带行信息，以及只生成业务代码的sourcemap
    // moudle：对loader里面的代码也生成sourcemap
    // eval：以eval的形式把sourcemap写到main.js里去
    devServer: {
        contentBase: './dist',//在哪一个目录下去启动服务器
        // open: true,
        proxy: {
            '/api': 'http://localhost:3000'
        },
        port: 8080,
        hot: true,//是否支持热更新（HMR）
        // hotOnly: true//即使HMR失效，也不自动刷新浏览器
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() 
    ],
}

module.exports = merge(devConfig, commonConfig)