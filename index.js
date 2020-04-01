// @ts-check
// webpack compiler options properties are marked as optional
// although most of them are not optional
// as a temporary work around this this is fixed with
// `import('ts-essentials').DeepRequired`
/** @typedef {import('ts-essentials').DeepRequired<import("webpack").Compiler>} WebpackCompiler */
/**
 * Plugin Options
 * @typedef {{ mode?: 'production' | 'development'; }} HtmlConfigWebpackPluginOptions
 */
const defaultOptions = {}

class HtmlConfigWebpackPlugin
{
    /**
    * @param {Partial<HtmlConfigWebpackPluginOptions>} [options]
    */
    constructor (options = {})
    {
        this.options = Object.assign({}, defaultOptions, options)
    }

    /**
    * @param {WebpackCompiler} compiler
    */
    apply (compiler)
    {
        const modeProduction = [
            this.options.mode,
            compiler.options.mode
        ].some(mode => mode === 'production')

        const options = {
            mode: modeProduction ? 'production' : 'development',
            ...this.options
        }

        const config = modeProduction
            ? require('./config/production.config')(options)
            : require('./config/development.config')(options)

        // Merge config
        compiler.options.plugins.push(...config.plugins)
        compiler.hooks.afterEnvironment.tap('SassWebpackPlugin', () =>
        {
            compiler.options.module.rules.push(...config.module.rules)
        })
    }
}

 exports = module.exports = HtmlConfigWebpackPlugin
