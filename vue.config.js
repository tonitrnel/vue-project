const { join } = require('path')

module.exports = {
  /**
   * Webpack chain操作
   * Config来自webpack-chain
   * @param config {Config}
   * @see https://github.com/neutrinojs/webpack-chain/tree/v5
   */
  chainWebpack: (config) => {
    // 使用~代替@符号
    config.resolve.alias
      .set('~', join(__dirname, 'src'))
      .set('assets', join(__dirname, 'src/assets'))
      .delete('@')
    // 添加less扩展
    config.resolve.extensions
      .clear()
      .add('.js')
      .add('.ts')
      .add('.tsx')
      .add('.vue')
      .add('.json')
      .add('.less')
    // 处理Svg图标
    const icons_dir = join(__dirname, 'src/assets/icons')
    config.module.rules.delete('svg')
    const svg_rules = config.module.rule('svg-sprite')
    svg_rules.include.add(icons_dir)
    svg_rules
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
    // 让images规则忽略
    const image_rules = config.module.rule('images')
    image_rules.exclude.add(join(__dirname, 'src/assets/icons'))
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },
}
