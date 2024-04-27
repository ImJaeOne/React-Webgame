const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'word-relay-setting',
    mode: 'development', // 실서비스: production
    devtool: 'eval', // 빠르게
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    entry: {
        app: ['./client'], // client.jsx에 WordRelay가 있으므로 WordRelay는 따로 불러올 필요 없음
    }, // 입력

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    browsers: ['> 5% in KR'],
                                },
                                debug: true,
                            },
                        ],
                        '@babel/preset-react',
                    ],
                    plugins: ['@babel/plugin-proposal-class-properties', 'react-refresh/babel'],
                },
            },
        ],
    },
    target: ['web', 'es5'],
    plugins: [new RefreshWebpackPlugin()],

    output: {
        path: path.join(__dirname, '/dist'), //C:\users\임가네\배경화면...
        filename: 'app.js',
        publicPath: '/dist/',
    }, // 출력
    devServer: {
        hot: true,
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
    },
};
