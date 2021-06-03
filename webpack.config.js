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
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                // If you are using less-loader@5 please spread the lessOptions to options directly
                modifyVars: {
                  'primary-color': '#fa43a7',
                  'link-color': '#fa43a7',
                  'border-radius-base': '5px',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
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
            week4: 149.12005174160004,
            week1: 128.79898205399513,
            week2: 133.08281889557838,
            week3: 141.10717052221298,
            week5: 138.644366979599,
            week6: 124.10975950956345,
            week7: 133.6972360908985,
            week8: 130.3956716954708,
          },
          total: 1078.9560574889183,
          user: 5280,
          avg: 0.20434773816077997,
          ads_ratio: {
            is: 614.8174438476562,
            rv: 53.818878173828125,
            ba: 74.02789306640625,
          },
        });
      });
      app.get('/ltv/api/device-os/analysis', (req, res) => {
        res.json([
          {
            count: 1,
            percentile: 0.03,
            device_os: 'Android 5.0.2',
          },
          {
            count: 6,
            percentile: 0.18,
            device_os: 'Android 5.1.1',
          },
          {
            count: 1,
            percentile: 0.03,
            device_os: 'Android 5.1',
          },
          {
            count: 19,
            percentile: 0.56,
            device_os: 'Android 6.0.1',
          },
          {
            count: 2,
            percentile: 0.06,
            device_os: 'Android 6.0',
          },
          {
            count: 74,
            percentile: 2.19,
            device_os: 'Android 7.0',
          },
          {
            count: 64,
            percentile: 1.89,
            device_os: 'Android 7.1.1',
          },
          {
            count: 6,
            percentile: 0.18,
            device_os: 'Android 7.1.2',
          },
          {
            count: 141,
            percentile: 4.17,
            device_os: 'Android 8.0.0',
          },
          {
            count: 159,
            percentile: 4.7,
            device_os: 'Android 8.1.0',
          },
          {
            count: 885,
            percentile: 26.15,
            device_os: 'Android 9',
          },
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
      app.get('/ltv/api/weekday/analysis/', (req, res) => {
        res.json([
          {
            count: 276,
            percentile: 8.16,
            weekday: 'Monday',
          },
          {
            count: 265,
            percentile: 7.83,
            weekday: 'Tuesday',
          },
          {
            count: 433,
            percentile: 12.8,
            weekday: 'Wednesday',
          },
          {
            count: 706,
            percentile: 20.86,
            weekday: 'Thursday',
          },
          {
            count: 695,
            percentile: 20.54,
            weekday: 'Friday',
          },
          {
            count: 544,
            percentile: 16.08,
            weekday: 'Saturday',
          },
          {
            count: 465,
            percentile: 13.74,
            weekday: 'Sunday',
          },
        ]);
      });
      app.get('/ltv/api/region/analysis/', (req, res) => {
        res.json([
          {
            count: 585,
            percentile: 17.29,
            region: 'California',
          },
          {
            count: 387,
            percentile: 11.44,
            region: 'Texas',
          },
          {
            count: 214,
            percentile: 6.32,
            region: 'Florida',
          },
          {
            count: 184,
            percentile: 5.44,
            region: 'New York',
          },
          {
            count: 128,
            percentile: 3.78,
            region: 'Illinois',
          },
          {
            count: 109,
            percentile: 3.22,
            region: 'North Carolina',
          },
          {
            count: 107,
            percentile: 3.16,
            region: 'Ohio',
          },
          {
            count: 100,
            percentile: 2.96,
            region: 'Georgia',
          },
          {
            count: 98,
            percentile: 2.9,
            region: 'Pennsylvania',
          },
          {
            count: 93,
            percentile: 2.75,
            region: 'Michigan',
          },
          {
            count: 83,
            percentile: 2.45,
            region: 'Washington',
          },
          {
            count: 81,
            percentile: 2.39,
            region: 'Maryland',
          },
          {
            count: 81,
            percentile: 2.39,
            region: 'Tennessee',
          },
          {
            count: 81,
            percentile: 2.39,
            region: 'Arizona',
          },
          {
            count: 74,
            percentile: 2.19,
            region: 'New Jersey',
          },
          {
            count: 69,
            percentile: 2.04,
            region: 'Indiana',
          },
          {
            count: 69,
            percentile: 2.04,
            region: 'Virginia',
          },
          {
            count: 56,
            percentile: 1.65,
            region: 'Colorado',
          },
          {
            count: 51,
            percentile: 1.51,
            region: 'Wisconsin',
          },
          {
            count: 51,
            percentile: 1.51,
            region: 'Massachusetts',
          },
          {
            count: 51,
            percentile: 1.51,
            region: 'Kentucky',
          },
          {
            count: 50,
            percentile: 1.48,
            region: 'Missouri',
          },
          {
            count: 47,
            percentile: 1.39,
            region: 'Oregon',
          },
          {
            count: 46,
            percentile: 1.36,
            region: 'Minnesota',
          },
          {
            count: 42,
            percentile: 1.24,
            region: 'Alabama',
          },
          {
            count: 39,
            percentile: 1.15,
            region: 'South Carolina',
          },
          {
            count: 39,
            percentile: 1.15,
            region: 'Nevada',
          },
          {
            count: 36,
            percentile: 1.06,
            region: 'Connecticut',
          },
          {
            count: 33,
            percentile: 0.98,
            region: 'Louisiana',
          },
          {
            count: 30,
            percentile: 0.89,
            region: 'Arkansas',
          },
          {
            count: 30,
            percentile: 0.89,
            region: 'Utah',
          },
          {
            count: 28,
            percentile: 0.83,
            region: 'Oklahoma',
          },
          {
            count: 27,
            percentile: 0.8,
            region: 'Iowa',
          },
          {
            count: 22,
            percentile: 0.65,
            region: 'Kansas',
          },
          {
            count: 18,
            percentile: 0.53,
            region: 'Mississippi',
          },
          {
            count: 18,
            percentile: 0.53,
            region: 'New Mexico',
          },
          {
            count: 16,
            percentile: 0.47,
            region: 'West Virginia',
          },
          {
            count: 16,
            percentile: 0.47,
            region: 'Nebraska',
          },
          {
            count: 14,
            percentile: 0.41,
            region: 'Maine',
          },
          {
            count: 13,
            percentile: 0.38,
            region: 'New Hampshire',
          },
          {
            count: 13,
            percentile: 0.38,
            region: 'Idaho',
          },
          {
            count: 12,
            percentile: 0.35,
            region: 'Hawaii',
          },
          {
            count: 7,
            percentile: 0.21,
            region: 'Montana',
          },
          {
            count: 7,
            percentile: 0.21,
            region: 'District of Columbia',
          },
          {
            count: 6,
            percentile: 0.18,
            region: 'Rhode Island',
          },
          {
            count: 6,
            percentile: 0.18,
            region: 'Vermont',
          },
          {
            count: 5,
            percentile: 0.15,
            region: 'North Dakota',
          },
          {
            count: 4,
            percentile: 0.12,
            region: 'Delaware',
          },
          {
            count: 3,
            percentile: 0.09,
            region: 'Alaska',
          },
          {
            count: 2,
            percentile: 0.06,
            region: 'Wyoming',
          },
          {
            count: 2,
            percentile: 0.06,
            region: 'South Dakota',
          },
          {
            count: 1,
            percentile: 0.03,
            region: 'Uncertain',
          },
        ]);
      });
      app.get('/ltv/api/device-name/analysis/', (req, res) => {
        res.json([
          {
            count: 116,
            percentile: 3.43,
            device_name: 'Galaxy S9',
          },
          {
            count: 112,
            percentile: 3.31,
            device_name: 'Galaxy A20',
          },
          {
            count: 109,
            percentile: 3.22,
            device_name: 'Stylo 5',
          },
          {
            count: 103,
            percentile: 3.04,
            device_name: 'Galaxy A10e',
          },
          {
            count: 98,
            percentile: 2.9,
            device_name: 'Galaxy S9+',
          },
          {
            count: 90,
            percentile: 2.66,
            device_name: 'Stylo 6',
          },
          {
            count: 85,
            percentile: 2.51,
            device_name: 'K51',
          },
          {
            count: 80,
            percentile: 2.36,
            device_name: 'Galaxy S8+',
          },
          {
            count: 76,
            percentile: 2.25,
            device_name: 'Galaxy S10+',
          },
          {
            count: 72,
            percentile: 2.13,
            device_name: 'Galaxy Note9',
          },
          {
            count: 71,
            percentile: 2.1,
            device_name: 'Galaxy A11',
          },
          {
            count: 69,
            percentile: 2.04,
            device_name: 'Galaxy S8',
          },
          {
            count: 68,
            percentile: 2.01,
            device_name: 'Galaxy A21',
          },
          {
            count: 67,
            percentile: 1.98,
            device_name: 'Galaxy Tab A 10.1 (2019)',
          },
          {
            count: 65,
            percentile: 1.92,
            device_name: 'Galaxy Note8',
          },
          {
            count: 61,
            percentile: 1.8,
            device_name: 'Galaxy S10',
          },
          {
            count: 58,
            percentile: 1.71,
            device_name: 'Galaxy Tab A 8.0 (2019)',
          },
          {
            count: 54,
            percentile: 1.6,
            device_name: 'Galaxy S10e',
          },
          {
            count: 47,
            percentile: 1.39,
            device_name: 'Galaxy J7 (2018)',
          },
          {
            count: 45,
            percentile: 1.33,
            device_name: 'Galaxy A01',
          },
          {
            count: 42,
            percentile: 1.24,
            device_name: 'Galaxy Note10+',
          },
          {
            count: 39,
            percentile: 1.15,
            device_name: 'Galaxy S7',
          },
          {
            count: 37,
            percentile: 1.09,
            device_name: 'K31',
          },
          {
            count: 29,
            percentile: 0.86,
            device_name: 'Galaxy S20+ 5G',
          },
          {
            count: 28,
            percentile: 0.83,
            device_name: 'Moto E6',
          },
          {
            count: 28,
            percentile: 0.83,
            device_name: 'Legacy',
          },
          {
            count: 27,
            percentile: 0.8,
            device_name: 'Galaxy Tab A 8.0 2017',
          },
          {
            count: 27,
            percentile: 0.8,
            device_name: 'Galaxy A71 5G',
          },
          {
            count: 27,
            percentile: 0.8,
            device_name: 'Galaxy A51',
          },
          {
            count: 26,
            percentile: 0.77,
            device_name: 'Galaxy J7 Top',
          },
          {
            count: 25,
            percentile: 0.74,
            device_name: 'Galaxy J7 (2017)',
          },
          {
            count: 24,
            percentile: 0.71,
            device_name: 'G Pad 5 10.1',
          },
          {
            count: 23,
            percentile: 0.68,
            device_name: 'K12 Plus',
          },
          {
            count: 23,
            percentile: 0.68,
            device_name: 'Galaxy A50',
          },
          {
            count: 22,
            percentile: 0.65,
            device_name: 'Galaxy Note20 5G',
          },
          {
            count: 22,
            percentile: 0.65,
            device_name: 'G6',
          },
          {
            count: 22,
            percentile: 0.65,
            device_name: '3V (2019)',
          },
          {
            count: 21,
            percentile: 0.62,
            device_name: 'Galaxy S20 5G',
          },
          {
            count: 21,
            percentile: 0.62,
            device_name: 'Galaxy Tab A 8.4',
          },
          {
            count: 21,
            percentile: 0.62,
            device_name: 'Journey LTE',
          },
          {
            count: 20,
            percentile: 0.59,
            device_name: 'Galaxy Tab A7 10.4 (2020)',
          },
          {
            count: 20,
            percentile: 0.59,
            device_name: 'K30',
          },
          {
            count: 19,
            percentile: 0.56,
            device_name: 'Galaxy Note10',
          },
          {
            count: 19,
            percentile: 0.56,
            device_name: 'Razr D1',
          },
          {
            count: 18,
            percentile: 0.53,
            device_name: 'Galaxy S8 Active',
          },
          {
            count: 17,
            percentile: 0.5,
            device_name: 'Galaxy J2 Core',
          },
          {
            count: 17,
            percentile: 0.5,
            device_name: 'Galaxy S20 FE 5G',
          },
          {
            count: 16,
            percentile: 0.47,
            device_name: 'Galaxy J3 Top',
          },
          {
            count: 16,
            percentile: 0.47,
            device_name: 'Aristo 3',
          },
          {
            count: 15,
            percentile: 0.44,
            device_name: 'Galaxy A51 5G',
          },
          {
            count: 15,
            percentile: 0.44,
            device_name: 'REVVL 4+',
          },
          {
            count: 14,
            percentile: 0.41,
            device_name: 'SmartTab M8',
          },
          {
            count: 14,
            percentile: 0.41,
            device_name: 'Joy Tab',
          },
          {
            count: 14,
            percentile: 0.41,
            device_name: 'Galaxy Tab S5e',
          },
          {
            count: 13,
            percentile: 0.38,
            device_name: 'Galaxy Tab A 10.1',
          },
          {
            count: 13,
            percentile: 0.38,
            device_name: 'Galaxy A6',
          },
          {
            count: 12,
            percentile: 0.35,
            device_name: 'G7 ThinQ',
          },
          {
            count: 12,
            percentile: 0.35,
            device_name: 'Rebel 4',
          },
          {
            count: 11,
            percentile: 0.33,
            device_name: 'Premier Pro Plus',
          },
          {
            count: 11,
            percentile: 0.33,
            device_name: 'Galaxy S7 Edge',
          },
          {
            count: 11,
            percentile: 0.33,
            device_name: 'Galaxy Tab A 8.0 (2018)',
          },
          {
            count: 11,
            percentile: 0.33,
            device_name: 'Galaxy A20s',
          },
          {
            count: 11,
            percentile: 0.33,
            device_name: 'Stylo 3',
          },
          {
            count: 11,
            percentile: 0.33,
            device_name: 'Galaxy J2 Pure',
          },
          {
            count: 11,
            percentile: 0.33,
            device_name: 'Stylo 4',
          },
          {
            count: 10,
            percentile: 0.3,
            device_name: 'Galaxy J7 2015',
          },
          {
            count: 9,
            percentile: 0.27,
            device_name: 'Galaxy Tab E',
          },
          {
            count: 9,
            percentile: 0.27,
            device_name: 'Galaxy Tab S6',
          },
          {
            count: 9,
            percentile: 0.27,
            device_name: 'Fortune 2',
          },
          {
            count: 9,
            percentile: 0.27,
            device_name: 'Galaxy Note 5',
          },
          {
            count: 9,
            percentile: 0.27,
            device_name: 'Galaxy A01 AT&T',
          },
          {
            count: 8,
            percentile: 0.24,
            device_name: 'Galaxy Tab S4',
          },
          {
            count: 8,
            percentile: 0.24,
            device_name: 'Galaxy Note10+ 5G',
          },
          {
            count: 7,
            percentile: 0.21,
            device_name: 'Galaxy Amp Prime 3 2018',
          },
          {
            count: 7,
            percentile: 0.21,
            device_name: 'Q7',
          },
          {
            count: 7,
            percentile: 0.21,
            device_name: 'Galaxy Tab E 8.0',
          },
          {
            count: 7,
            percentile: 0.21,
            device_name: 'Galaxy S20 Ultra 5G',
          },
          {
            count: 7,
            percentile: 0.21,
            device_name: 'Galaxy J3 V 3rd Gen',
          },
          {
            count: 7,
            percentile: 0.21,
            device_name: 'Galaxy Note 20 Ultra 5G',
          },
          {
            count: 7,
            percentile: 0.21,
            device_name: 'Fire HD 10 (2019)',
          },
          {
            count: 6,
            percentile: 0.18,
            device_name: 'V40 ThinQ',
          },
          {
            count: 6,
            percentile: 0.18,
            device_name: 'G8 ThinQ',
          },
          {
            count: 6,
            percentile: 0.18,
            device_name: 'Galaxy J3 Star',
          },
          {
            count: 6,
            percentile: 0.18,
            device_name: 'Galaxy J3 2017',
          },
          {
            count: 6,
            percentile: 0.18,
            device_name: 'X Charge',
          },
          {
            count: 6,
            percentile: 0.18,
            device_name: 'Ovation',
          },
          {
            count: 5,
            percentile: 0.15,
            device_name: 'Galaxy S6',
          },
          {
            count: 5,
            percentile: 0.15,
            device_name: 'Emblem Radiant',
          },
          {
            count: 5,
            percentile: 0.15,
            device_name: 'Tablet Pro',
          },
          {
            count: 5,
            percentile: 0.15,
            device_name: 'Galaxy Tab A',
          },
          {
            count: 5,
            percentile: 0.15,
            device_name: 'V60 ThinQ 5G',
          },
          {
            count: 5,
            percentile: 0.15,
            device_name: 'V36',
          },
          {
            count: 5,
            percentile: 0.15,
            device_name: 'Reflect',
          },
          {
            count: 5,
            percentile: 0.15,
            device_name: 'Galaxy Tab A 8.0 LTE (2019)',
          },
          {
            count: 4,
            percentile: 0.12,
            device_name: 'Insight',
          },
          {
            count: 4,
            percentile: 0.12,
            device_name: 'Fire 7 Tablet',
          },
          {
            count: 4,
            percentile: 0.12,
            device_name: 'J2 Core+',
          },
          {
            count: 4,
            percentile: 0.12,
            device_name: 'Galaxy S21 5G',
          },
          {
            count: 4,
            percentile: 0.12,
            device_name: 'Moto Z2 Force',
          },
          {
            count: 4,
            percentile: 0.12,
            device_name: 'Galaxy Tab A 10.5',
          },
          {
            count: 4,
            percentile: 0.12,
            device_name: 'Galaxy Tab S6 Lite',
          },
          {
            count: 4,
            percentile: 0.12,
            device_name: 'Galaxy S20 Ultra',
          },
          {
            count: 4,
            percentile: 0.12,
            device_name: 'Galaxy J3 Achieve',
          },
          {
            count: 4,
            percentile: 0.12,
            device_name: 'Moto G6',
          },
          {
            count: 4,
            percentile: 0.12,
            device_name: 'Galaxy A10s',
          },
          {
            count: 4,
            percentile: 0.12,
            device_name: 'Phoenix 4',
          },
          {
            count: 4,
            percentile: 0.12,
            device_name: '7 Pro',
          },
          {
            count: 3,
            percentile: 0.09,
            device_name: 'Blade Spark',
          },
          {
            count: 3,
            percentile: 0.09,
            device_name: 'Blade Z Max',
          },
          {
            count: 3,
            percentile: 0.09,
            device_name: 'Legacy S',
          },
          {
            count: 3,
            percentile: 0.09,
            device_name: 'Blade Vantage 2',
          },
          {
            count: 3,
            percentile: 0.09,
            device_name: 'Fire HD 8 (2020)',
          },
          {
            count: 3,
            percentile: 0.09,
            device_name: 'Galaxy S6 Edge Plus',
          },
          {
            count: 3,
            percentile: 0.09,
            device_name: 'Moto e5 plus',
          },
          {
            count: 3,
            percentile: 0.09,
            device_name: 'Galaxy A71',
          },
          {
            count: 3,
            percentile: 0.09,
            device_name: 'Raven',
          },
          {
            count: 3,
            percentile: 0.09,
            device_name: 'Velvet',
          },
          {
            count: 3,
            percentile: 0.09,
            device_name: 'Galaxy A70',
          },
          {
            count: 3,
            percentile: 0.09,
            device_name: '7',
          },
          {
            count: 3,
            percentile: 0.09,
            device_name: '7T',
          },
          {
            count: 3,
            percentile: 0.09,
            device_name: '6T',
          },
          {
            count: 3,
            percentile: 0.09,
            device_name: 'Harmony 4',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Galaxy J7 Prime',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Galaxy S6 Active',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Trek 2 HD',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Galaxy S21 Ultra 5G',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Fiesta LTE',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'V30+',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Galaxy Tab A 9.7',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Fire HD 10 (2017)',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Tribute Dynasty',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Avalon V',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Galaxy J2 Dash',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Mid8011',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Galaxy Tab E 9.6',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Honor 8X',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Blade Vantage',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: '6',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Fire HD 8 (2018)',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Stylo 3 Plus',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Revvl Plus',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'K20 Plus',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: '5T',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'V20',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Galaxy A30s',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Moto Z Droid',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: '8',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'G Pad F2 8.0',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'REVVL 5G',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Galaxy Tab S7 5G',
          },
          {
            count: 2,
            percentile: 0.06,
            device_name: 'Galaxy Tab S2 8.0',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Phone',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'V30',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: '8 HD tablet',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Harmony',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy Fold',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: '7 Pro 5G',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Premier Pro',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Mate 20 Pro',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Honor 20 lite',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Tab E10',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'G8X ThinQ',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy Tab S3 9.7',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy A31',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy Note20',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Blade A3v',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Ellipsis 10',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Mate 20 X',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'G3',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'moto e5',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Stylo 2 Plus',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Aristo',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Kindle Fire HD 8 (2017)',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy A7 (2017)',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'MatrixPad S8',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'ZMax Pro',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: '1B',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy On6',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Tetra',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Avid 4',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy S7 Active',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy S6 Edge',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: '10 5G',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'K8S',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'GALAXY SOL 3 (2018)',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'A2X',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy Note 4',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: '5',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy On5',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'K7',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy A21s',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy A01 Verizon',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'A30 Fierce',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'F5 Youth',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Zone 4',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy View',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'A30',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Stylo 4 Plus',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy J8',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Tab4 8',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Y7 Prime 2019',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy S21+ 5G',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Ariel-C',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy A10',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'K20 V',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'X Power',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Zenpad Z10 ZT500KL',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'G Pad X2 8.0 Plus',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'MatePad Pro',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'DuraForce Pro 2',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Blade Force',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'K92 5G',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Ride 2',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Wing 5G',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Xperia XA2 Ultra',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'ZFIVE G',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: '3T 8',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Axon 7',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galileo Pro 11.5',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Honor 8',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy Tab A 8.0 2018',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'A9 (2020)',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Y17',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Ride',
          },
          {
            count: 1,
            percentile: 0.03,
            device_name: 'Galaxy Tab A 10.1 2016',
          },
        ]);
      });
      app.get('/ltv/api/time/analysis/', (req, res) => {
        res.json([
          {
            count: 1232,
            percentile: 3.64,
            hour: 0,
          },
          {
            count: 1858,
            percentile: 5.49,
            hour: 1,
          },
          {
            count: 2104,
            percentile: 6.22,
            hour: 2,
          },
          {
            count: 2223,
            percentile: 6.57,
            hour: 3,
          },
          {
            count: 2252,
            percentile: 6.65,
            hour: 4,
          },
          {
            count: 2205,
            percentile: 6.52,
            hour: 5,
          },
          {
            count: 2404,
            percentile: 7.1,
            hour: 6,
          },
          {
            count: 2389,
            percentile: 7.06,
            hour: 7,
          },
          {
            count: 2348,
            percentile: 6.94,
            hour: 8,
          },
          {
            count: 2113,
            percentile: 6.24,
            hour: 9,
          },
          {
            count: 2144,
            percentile: 6.33,
            hour: 10,
          },
          {
            count: 2070,
            percentile: 6.12,
            hour: 11,
          },
          {
            count: 1761,
            percentile: 5.2,
            hour: 12,
          },
          {
            count: 1418,
            percentile: 4.19,
            hour: 13,
          },
          {
            count: 1016,
            percentile: 3,
            hour: 14,
          },
          {
            count: 592,
            percentile: 1.75,
            hour: 15,
          },
          {
            count: 453,
            percentile: 1.34,
            hour: 16,
          },
          {
            count: 309,
            percentile: 0.91,
            hour: 17,
          },
          {
            count: 271,
            percentile: 0.8,
            hour: 18,
          },
          {
            count: 184,
            percentile: 0.54,
            hour: 19,
          },
          {
            count: 296,
            percentile: 0.87,
            hour: 20,
          },
          {
            count: 498,
            percentile: 1.47,
            hour: 21,
          },
          {
            count: 755,
            percentile: 2.23,
            hour: 22,
          },
          {
            count: 949,
            percentile: 2.8,
            hour: 23,
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
