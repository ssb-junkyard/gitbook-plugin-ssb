const msgIdRe = /(%[A-Za-z0-9\/+]{43}=\.sha256)/g

module.exports = {
  hooks: {
    'init': function() {
      var options = this.config.get('pluginsConfig')['ssb'] || {}
      console.log('init', options)
    },
    'page:before': function (page) {
      var options = this.config.get('pluginsConfig')['ssb'] || {}
      page.content = linkMessageIdsToViewer(page.content, options.viewer)
      return page
    }
  },
  blocks: {},
  filters: {}
}

function linkMessageIdsToViewer (text, viewer) {
  return text.replace(msgIdRe, (match, id, offset, string) => {
    return `[${id}](${viewer}/${encodeURIComponent(id)})`
  })
}
