const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const babelConf = require("../.babelrc");
require("@babel/register")({
  extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  ...babelConf,
});
// Instances 
// const packageJSON = require('../package')

const devMode = process.env.NODE_ENV === "development";

module.exports = {
  externals: {
    canvg: "canvg",
    dompurify: "dompurify",
  },
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  resolve: {
    alias: {
      root: path.resolve(__dirname, "../"),
      layouts: path.resolve(__dirname, "../src/layouts"),
      components: path.resolve(__dirname, "../src/components/"),
      hooks: path.resolve(__dirname, "../src/hooks/"),
      assets: path.resolve(__dirname, "../src/assets/"),
      services: path.resolve(__dirname, "../src/services/"),
      utils: path.resolve(__dirname, "../src/utils/"),
      models: path.resolve(__dirname, "../src/models/"),
      "@": path.resolve(__dirname, "../src/"),
      "imgs": path.resolve(__dirname, "../src/imgs"),
      css: path.resolve(__dirname, "../src/css"),
      // serpens: path.resolve(__dirname, '../packages/serpens/'),
      // 'rc-modal-manager': path.resolve(__dirname, '../packages/rc-modal-manager/'),
    },
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        include: [path.resolve(__dirname, "../src")],
        use: "ejs-loader",
      },
      // {
      // 	test: /\.[t|j]sx?$/,
      // 	// exclude: /node_modules/,
      // 	include: /node_modules\/hls.js/,
      // 	use: 'babel-loader',
      // },
      {
        test: /\.[t|j]sx?$/,
        exclude: /node_modules/,
        // include: /node_modules\/hls.js\/src/,
        use: "babel-loader",
      },

      // 针对node_modules以外的less/css进行操作,在development环境下生成style标签,在production环境下进行css代码压缩
      {
        test: /\.(less|css)$/,
        exclude: [path.resolve(__dirname, "../node_modules")],
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[local]_[hash:base64:6]",
            },
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: "./",
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },

              // paths: [path.resolve(__dirname, './')],
            },
          },
        ],
      },
      // 针对node_modules的less/css进行操作在development环境下生成style标签,在production环境下进行css代码压缩
      {
				test: /\.(css|less)$/,
				// include: [path.resolve(__dirname, '../node_modules')],
				include: [/antd/, /rc-slider/, /rc-drawer-menu/, /@ant-design/, /rc-texty/],
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					{
						loader: 'less-loader',
						// options: {
						// 	modifyVars: {
						// 		'font-family': 'PingFangSC-Regular',
						// 		'primary-color': '#0068eb',
						// 		'text-color': 'rgba(0, 0, 0, 0.65)',
						// 	},
						// 	javascriptEnabled: true,
						// },
						options: {
							lessOptions: {
								javascriptEnabled: true,
								modifyVars: {
									'font-family': 'PingFangSC-Regular',
									'primary-color': '#0068eb',
									'text-color': 'rgba(0, 0, 0, 0.65)',
								},
							},
						},
					},
				],
			},
      {
        test: /\.css$/,
        include: [
          /bootstrap/
        ],
        use: [ 'css-loader', 'postcss-loader' ]
      },
      // {
      //   test: /\.(sass|scss)$/,
      //   include: [
      //     /bootstrap/
      //   ],
      //   use:[ 'css-loader', 'postcss-loader', 'sass-loader' ]
      // },
      // {
      //   test: /\.less$/,
      //   include: [
      //     /bootstrap/
      //   ],
      //   use: [ 'css-loader', 'postcss-loader', 'less-loader' ]
      // },

      // 文件小于8192字节会进行base64压缩
      {
        test: /\.(jpg|jpeg|bmp|svg|png|webp|gif|csv)$/,
        include: [path.resolve(__dirname, "../src")],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      // {
      // 	loader: 'webpack-ant-icon-loader',
      // 	enforce: 'pre',
      // 	// options:{
      // 	//   chunkName:'antd-icons'
      // 	// },
      // 	include: [require.resolve('@ant-design/icons/lib/dist')],
      // },
    ],
  },
  stats: {
    // One of the two if I remember right
    entrypoints: false,
    children: false
    },
  plugins: [
    
    // process.env.XXX 为字符串时需要用JSON.stringify()
    new webpack.DefinePlugin({
      // 'process.env.NOVA_ROOT': JSON.stringify(process.env.NOVA_ROOT),
      IS_PROXY: JSON.stringify(process.env.IS_PROXY),
      DEV_MODE: JSON.stringify(process.env.DEV_MODE),
      // PACKAGE_VERSION: packageJSON.version,
      NOVA_ROOT: JSON.stringify(process.env.NOVA_ROOT),
      NOVA_MEDIA_ROOT: JSON.stringify(process.env.NOVA_MEDIA_ROOT),
    }),
    new CleanWebpackPlugin(),
    // new SpeedMeasurePlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.ejs",
    }),
    new MiniCssExtractPlugin({
      filename: `[name].[hash:7].css`,
      ignoreOrder: true,
    }),
    // 按需加载lodash的插件
    // new LodashModuleReplacementPlugin({
    // 	paths: true,
    // }),
    // 按需引入moment语言包
    new MomentLocalesPlugin({
      localesToKeep: ["es-us", "zh-cn"],
    }),
    // 复制public目录
    new CopyPlugin({
      patterns: [{ from: path.join(__dirname, "../public"), to: "./" }],
    }),
    // 禁用warning
    new FilterWarningsPlugin({
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
    }),
  ],
  optimization: {
    runtimeChunk: true,
    usedExports: true,
    splitChunks: {
      name: true,
      chunks: "async",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      cacheGroups: {
        vendors: {
          name: "vendor",
          test: /(react|react-dom|react-dom-router|babel-polyfill|react-redux|redux|react-router|dva)/,
          chunks: "all",
          priority: 100,
        },
        antdVendors: {
          test: /antd/,
          priority: 100,
          name: "antd",
          chunks: "async",
        },
        "@ant-designVendors": {
          test: /@ant-design/,
          priority: 100,
          name: "@ant-design",
          chunks: "async",
        },
        monacoEditorVendors: {
          test: /monaco-editor/,
          priority: 100,
          name: "monaco-editor",
          chunks: "async",
        },
        bizChartsVendors: {
          test: /bizcharts/,
          priority: 100,
          name: "bizcharts",
          chunks: "async",
        },
        reactWorldFlagsVendors: {
          test: /react-world-flags/,
          priority: 100,
          name: "react-world-flags",
          chunks: "async",
        },
        "@amchartsVendors": {
          test: /@amcharts/,
          priority: 100,
          name: "amcharts",
          chunks: "async",
        },
        "@antv/data-setVendors": {
          test: /@antv\/data-set/,
          priority: 100,
          name: "@antv/data-set",
          chunks: "async",
        },
        "async-commons": {
          // 异步加载公共包、组件等
          chunks: "async",
          minChunks: 3,
          name: "async-commons",
          priority: 90,
        },
        commons: {
          // 其他同步加载公共包
          chunks: "all",
          minChunks: 2,
          name: "commons",
          priority: 80,
        },
      },
    },
  },
};
