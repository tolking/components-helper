const helper = require('../lib/index')

helper({
  name: 'test',
  entry: 'test/*.md',
  outDir: '../dist',
})
