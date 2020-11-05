const express = require('express')
const webpack = require('webpack')//引入webpack库
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')//引入webpack的配置文件
const complire = webpack(config)//webpack结合配置文件可以随时进行代码编译
// 让编译器重新执行一次，它就会帮你重新打包代码

//用express创建一个服务器的实例
const app = express()

// 只要文件发生改变了，complire就会重新运行，
// publicPath就是webpack配置中对应的publicPath
app.use(webpackDevMiddleware(complire, {
    publicPath: config.output.publicPath
}))

app.listen(3000, () => {
    console.log('server is running');
})