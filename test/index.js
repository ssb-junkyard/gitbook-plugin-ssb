const test = require('tape')

const gitbookPluginSsb = require('../')

test('gitbook-plugin-ssb', function (t) {
  t.ok(gitbookPluginSsb, 'module is require-able')
  t.end()
})
