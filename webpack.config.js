const copyWebpack = require('copy-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const NODE_ENV = process.env.NODE_ENV || 'development'
const DEV_SERVER = process.env.DEV_SERVER || 0
const GLOBAL_STYLE = path.join(__dirname, 'src/styles/global.scss')

let config = {
	entry: {
		bundle: path.join(__dirname, 'src/app.tsx'),
		vendor: ['react', 'react-dom', 'react-router', 'mobx', 'mobx-react', 'firebase', 'react-addons-css-transition-group', 'react-flex']
	},
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.css', '.scss']
  },
  devtool: 'source-map',	
	output: {
		path: path.join(__dirname, 'public/assets'),
		filename: '[name].js',
		publicPath: '/assets'
	},
	module: {
		loaders: [
			{ test: /\.tsx?$/, loaders: ['babel', 'awesome-typescript'] },
			{
				test: GLOBAL_STYLE,
				loaders: ['style', 'css', 'sass']
			},			
			{
				test: /(\.scss|\.css)$/,
				exclude: GLOBAL_STYLE,
				loader: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!sass' }),
			}
		]	
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(NODE_ENV)
			}
		}),
		new ExtractTextPlugin('styles.css'),
		new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
		copyWebpack([{ from: path.join(__dirname, 'src/sw.js'), to: path.join(__dirname, 'public/assets/sw.js') }])
	],
	sassLoader: {
		data: '@import "' + path.join(__dirname, 'src/styles/theme.scss') + '";'
	}	
}

if (parseInt(DEV_SERVER) === 1) {
	const Dashboard = require('webpack-dashboard')
	const DashboardPlugin = require('webpack-dashboard/plugin')
	const dashboard = new Dashboard()	
	config.plugins.push(new DashboardPlugin(dashboard.setData))
}

if (NODE_ENV === 'production') {
	config.plugins.push(new webpack.optimize.DedupePlugin())
	config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: { 
			warnings: false, 
			drop_console: true 
		},
		comments: false,
		sourceMap: false,
		mangle: {
			except: [
				'Array', 'BigInteger', 'Boolean', 'Buffer',
				'webpackJsonp', 'exports', 'require',
			]
		},
		minimize: true
	}))
}

module.exports = config
