const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const BundlePlugin = require('webpack-bundle-analyzer')
const WebpackBar = require('webpackbar')
const common = require('./webpack.common.js')
const origin = 'http://175.24.185.250:8000'

const { BundleAnalyzerPlugin } = BundlePlugin

if (process.env.ANALYZER) {
	common.plugins.push(
		new BundleAnalyzerPlugin({
			analyzerMode: 'server',
			analyzerHost: '127.0.0.1',
			analyzerPort: 8888,
			reportFilename: 'report.html',
			defaultSizes: 'parsed',
			openAnalyzer: true,
			generateStatsFile: false,
			statsFilename: 'stats.json',
			logLevel: 'info',
		}),
	)
}

module.exports = merge(common, {
	mode: 'production',
	plugins: [
		// 打包后的代码进行gzip压缩
		new CompressionPlugin({
			cache: true,
			test: /\.js|\.css(\?.*)?$/i,
		}),
		new WebpackBar({
			name: 'Build of production',
			reporters: [
				'fancy', // Show Bar
				'basic', // 开始编译，编译结束总体耗时 Title 提示
				'profile', // Loader 耗时统计
				// 'stats', // 打包后资源结果展示
			],
			fancy: true,
			basic: true,
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: 4,
			}),
		],
		flagIncludedChunks: true,
		occurrenceOrder: true,
		mergeDuplicateChunks: true,
	},
})
