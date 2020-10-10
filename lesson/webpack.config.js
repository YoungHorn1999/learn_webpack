const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        limit: 204800
                    }
                }
            },
            {
                test: /\.scss$/,
                use:[
                        'style-loader', 
                        'css-loader', 
                        'sass-loader',
                    ]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html'
    }), new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['dist']
    })],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}