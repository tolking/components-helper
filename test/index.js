const helper = require('../lib/index')

helper({
  name: 'test',
  entry: './*.md',
  outDir: '../dist',
})
