const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CONFIG = require("./config")

// 4、提取第三方JS庫
const VENDOR = [
    "react",
    "react-dom",
    "react-router-dom",
    "lib-flexible",
];


// 5.1 配置resolve和alias，代替简写
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/entry.js',
        //1.1
        vendor: VENDOR
    },
    output: {
        path: CONFIG.build.outRoot,
        // filename: 'app_[chunkhash].js'
        // 加上/js就会输出到js文件夹下面
        filename: 'js/[name]_[chunkhash].js'
    },
    // 5.2 jsx，js中可以@/xxx/xx
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            //1.1 解析压缩css,css-loader，
            {
                test: /\.css$/,
                // 6.2 想抽离出来得
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    // use: 'css-loader',
                    use: [{
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            //2 处理图片,图片路径需是相对路径才能看到效果
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        // 默认打包到dist下的img文件夹
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }
            },
            // 1.4 使用stylus-loader 编译 .stylus为CSS
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        // "postcss-loader",
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        "stylus-loader"
                    ]
                })
            },
            //3 编译es6和编译jsx
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                // 5.3 jsx，js中可以@/xxx/xx
                include: [resolve('src')],
                use: {
                    loader: "babel-loader"
                }
            },
            //4 处理字体
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        // fonts/打包到dist下的fonts文件夹
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }
            }

        ]
    },
    plugins: [
        //5、提取css到单独的文件夹
        new ExtractTextPlugin({
            //加上/css就会输出到css文件夹下面
            filename: 'css/app_[hash].css',
            // filename:'app_[chunkhash].css',
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'React-Todo',
            abc: '自定义输出',
            filename: 'index.html',
            template: 'webpack.html.ejs'
        }),
    ]
};