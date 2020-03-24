const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        index: './src/js/index.jsx',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist'
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            loader: 'babel-loader',
            exclude: '/node-modules/'
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },
        {
            test: /\.css$/,
            use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: '../',
                  },
                },
                'css-loader',
                "postcss-loader",
              ],
          },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/main.css"
        })
      ]
}