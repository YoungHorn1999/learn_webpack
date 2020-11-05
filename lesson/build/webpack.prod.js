const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const prodConfig = {
    mode: 'production',//代码按照开发环境进行打包，打包后的代码不会被压缩
    devtool: 'cheap-module-source-map',
    //cheap：生成sourcemap的时候不带列信息，只带行信息，以及只生成业务代码的sourcemap
    // moudle：对loader里面的代码也生成sourcemap
    // eval：以eval的形式把sourcemap写到main.js里去
}

module.exports = merge(prodConfig, commonConfig)