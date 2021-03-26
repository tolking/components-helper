// eslint-disable-next-line @typescript-eslint/no-var-requires
const helper = require('../lib/index')

helper({
  name: 'test',
  version: '1.0.0',
  entry: 'test/*.md',
  outDir: 'dist',
  props: 'Attributes',
  propsName: 'Attribute',
  propsOptions: 'Accepted Values',
  eventsName: 'Event Name',
})
