const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'gugudan-setting',
    mode: 'development',
    devtool: 'eval', // productuin일 때는 hidden-source-map
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    entry: {
        app: ['./client'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    browsers: ['> 5% in KR', 'last 2 chrome versions'],
                                },
                            },
                        ],
                        '@babel/preset-react',
                    ],
                    plugins: ['@babel/plugin-proposal-class-properties'],
                },
            },
        ],
    },
    plugins: [new webpack.LoaderOptionsPlugin({ degub: true })],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    },
};
