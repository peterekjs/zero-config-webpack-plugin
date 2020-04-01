const SourceMapDevToolPlugin = require('webpack').SourceMapDevToolPlugin
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const AssetConfigWebpackPlugin = require('asset-config-webpack-plugin')
const JsConfigWebpackPlugin = require('js-config-webpack-plugin')
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin')
const HtmlConfigWebpackPlugin = require('@peterek/html-config-webpack-plugin')
const SassConfigWebpackPlugin = require('@peterek/sass-config-webpack-plugin')

/**
 * Common Development Config
 *
 * @param {Required<import("./index.js").ZeroWebpackPluginOptions>} options
 * @returns {{ module: { rules : Array<any> }, plugins: Array<(new (): any)> }}
 */
exports = module.exports = options => ({
    module: {
        rules: []
    },
    plugins: [
        new CleanWebpackPlugin(),
        new JsConfigWebpackPlugin(options.js),
        new TsConfigWebpackPlugin(),
        new AssetConfigWebpackPlugin(),
        new HtmlConfigWebpackPlugin(),
        new SassConfigWebpackPlugin(),
        new SourceMapDevToolPlugin({
            test: /\.js$/,
            exclude: 'node_modules',
            filename: '[name].js.map',
            module: true,
            columns: true
        }),
    ]
})
