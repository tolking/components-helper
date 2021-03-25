// eslint-disable-next-line @typescript-eslint/no-var-requires
const helper = require('../lib/index')

helper({
  name: 'test',
  entry: 'test/*.md',
  outDir: '../dist',
  attributesOptions: 'Accepted Values',
})
