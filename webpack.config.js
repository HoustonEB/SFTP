const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './lib/index.js',
    output: {
        filename: 'index.js',
        library: 'SftpConnection',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: '/node_modules/'
            }
        ]
    }
};