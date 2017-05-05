const webpack = require('webpack');
let isProduction = process.env.NODE_ENV === 'production';
const entry = isProduction ? {
    'lib/input-moment': './src/input-moment',
} : {
    'example/bundle': './example/app.js',
};

module.exports = {
    entry: entry,
    output: {
        path: __dirname,
        filename: '[name].js',
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'moment': 'moment',
    },
    devtool: 'source-map',
    devServer: {
        contentBase: "example",
    }
};
