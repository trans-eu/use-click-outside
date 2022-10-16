const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { name, version } = require('./package.json');

module.exports = {
    entry: path.join(__dirname, 'example'),
    module: {
      rules: [
        {
          test: /\.m?jsx?$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: `${name} (${version})`,
      }),
    ],
};
