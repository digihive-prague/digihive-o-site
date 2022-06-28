const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')

// create a list of twig files to generate
// filter out anything that starts with an underscore or is not a twig file
function walk(dir) {
	let results = []
	const list = fs.readdirSync(dir)
	list.forEach((file) => {
		file = `${dir}/${file}`
		const stat = fs.statSync(file)
		if (stat && stat.isDirectory() && path.basename(file).indexOf('_') !== 0) {
			/* Recurse into a subdirectory */
			results = results.concat(walk(file))
		} else if (stat && !stat.isDirectory() && path.extname(file) === '.twig' && path.basename(file).indexOf('_') !== 0) {
			/* Is a file */
			results.push(file)
		}
	})
	return results
}

//start looking in the main twig folder
const files = walk(path.resolve(__dirname, 'src/templates/pages'))

// generate html plugins to export
const htmlPlugins = files.map(
	(file) =>
		// Create new HTMLWebpackPlugin with options
		new HtmlWebpackPlugin({
			filename: file.replace('src/templates/pages', 'dist').replace('.twig', '.html'),
			template: path.resolve(__dirname, file),
			minify: false,
			inject: false
		})
)

module.exports = {
	entry: {
		app: './src/app.js',
		carousel: './src/components/Carousel/Carousel.js',
		contactPopup: './src/components/ContactPopup/ContactPopup.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'assets/js/[name].js',
		library: '[name]',
		libraryTarget: 'window'
	},
	optimization: {
		minimize: true,
		minimizer: ['...', new HtmlMinimizerPlugin()]
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
			watch: true
		},
		compress: true,
		host: '0.0.0.0',
		port: 3000,
		devMiddleware: {
			writeToDisk: true
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		...htmlPlugins,
		new CopyPlugin({
			patterns: [
				{
					from: './src/assets/img/',
					to: './assets/img/'
				},
				{
					from: './src/assets/fonts/',
					to: './assets/fonts/'
				},
				{
					from: './src/components/ContactPopup/php/',
					to: './'
				}
			]
		}),
		new ImageminWebpWebpackPlugin({
			config: [
				{
					test: /\.(jpe?g|png)/,
					options: {
						quality: 100
					}
				}
			]
		}),
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].css',
			chunkFilename: '[id].css'
		})
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: false
						}
					},
					'postcss-loader'
				]
			},
			{
				test: /\.twig$/,
				use: [
					'raw-loader',
					{
						loader: 'twig-html-loader'
					}
				]
			}
		]
	}
}
