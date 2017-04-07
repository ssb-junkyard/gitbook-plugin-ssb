const ref = require('ssb-ref')
const remark = require('remark')
const map = require('unist-util-map')

module.exports = Transform

function Transform (options) {
  const transformer = remark()
    .use(Transformer, options)

  return function transform (text) {
    const file = transformer.processSync(text)
    return file.contents
  }
}

function Transformer (options) {
  const viewer = options.viewer

  return function transformer (tree) {
    return map(tree, mapper)
  }

  function mapper (node) {
    switch (node.type) {
      case 'code':
      case 'inlineCode':
      case 'text':
        if (ref.isMsg(node.value)) {
          const id = node.value
          return {
            type: 'link',
            title: id,
            url: `${viewer}/${encodeURIComponent(id)}`,
            children: [{
              type: 'text',
              value: id
            }]
          }
        }
    }
    return node
  }
}
