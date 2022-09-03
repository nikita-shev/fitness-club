module.exports = {
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
        ]
    },
    optimization: {
        minimize: false
    }
};
