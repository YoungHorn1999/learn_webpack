const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    // 碰到jpg、png、gif文件时用url-loader进行打包
                    // 它会把文件拷贝到dist目录下，同时返回一个文件对应的地址
                    options: {
                        name: '[name]_[hash].[ext]',//placeholder 占位符  定义打包之后的文件名
                        outputPath: 'images/',//将图片打包到dist目录下的image文件夹中
                        limit: 2048000//如果图片小于limit，就用base-64形式打包到main.js里
                        // 如果超过limit，就以file-loader的方式打包，直接把图片放到dist目录下
                    }
                }
            },
            {
                test: /\.(svg|ttf|eot|woff)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', //把生成的CSS代码挂载到页面上
                    {
                        loader: "css-loader",//分析CSS代码语法
                        options: {
                            importLoaders: 2
                        }
                    }, 
                    'sass-loader',//对sass代码进行解析
                    'postcss-loader'
                    // 从下往上执行
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 
                    "css-loader",
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"//如果是JS文件，就用babel-loader进行打包
                // babel-loader的一些配置放在.babelrc文件中
            }
        ]
    },
    plugins: [
        // 自动生成一个dist目录下的html文件
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }), 
        // 每次打包时自动删除原先的dist目录
        new CleanWebpackPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'async',//只对异步代码生效,如果是all的话就同步和异步都生效
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    priority: -20,
                    reuseExistingChunk: true,
                    filename: 'common.js'
                }
            }
        }
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    }
}