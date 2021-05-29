const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV;
const removeNewLine = buffer => buffer.toString().replace('\n', '');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader // 프로덕션 환경
            : 'style-loader', // 개발 환경
          'css-loader',
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader', // url 로더를 설정한다
          options: {
            publicPath: './', // file-loader와 동일
            name: '[name].[ext]?[hash]', // file-loader와 동일
            limit: 5000, // 5kb 미만 파일만 data url로 처리
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader', // 바벨 로더를 추가한다
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date :: ${new Date().toLocaleString()}
        Commit Version :: ${removeNewLine(
          childProcess.execSync('git rev-parse --short HEAD'),
        )}
        Auth.name :: ${removeNewLine(
          childProcess.execSync('git config user.name'),
        )}
  `,
    }),
    new webpack.DefinePlugin({
      test: JSON.stringify('test'),
      'api.domain': JSON.stringify('http://localhost:8000/'),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: env === 'development' ? '(개발용)' : '프로덕션',
      },
      minify:
        env === 'production'
          ? { collapseWhitespace: true, removeComments: true }
          : false,
    }),
    new CleanWebpackPlugin(),

    ...(env === 'production'
      ? [new MiniCssExtractPlugin({ filename: '[name].css' })]
      : []),
  ],
  devServer: {
    before: (app, server, compiler) => {
      app.get('/ltv/api/prediction', (req, res) => {
        res.json({
          data: {
            week1: 128.79898205399513,
            week2: 133.08281889557838,
            week3: 141.10717052221298,
            week4: 149.12005174160004,
            week5: 1823.1234,
          },
          total: 1078.9560574889183,
          user: 5280,
          avg: 0.20434773816077997,
        });
      });
      app.get('/ltv/api/device-os/analysis', (req, res) => {
        res.json([
          {
            count: 1731,
            percentile: 51.15,
            device_os: 'Android 10',
          },
          {
            count: 295,
            percentile: 8.72,
            device_os: 'Android 11',
          },
        ]);
      });
    },
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    // host: "dev.domain.com",
    overlay: true,
    port,
    stats: 'errors-only',
    historyApiFallback: true,
  },
};
