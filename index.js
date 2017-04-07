const Transform = require('./transform')

module.exports = {
  hooks: {
    'init': function() {
      var options = this.config.get('pluginsConfig')['ssb'] || {}
      // TODO initialize transformer here
    },
    'page:before': function (page) {
      const options = this.config.get('pluginsConfig')['ssb'] || {}
      const transform = Transform(options)
      page.content = transform(page.content)
      return page
    }
  },
  blocks: {},
  filters: {}
}
