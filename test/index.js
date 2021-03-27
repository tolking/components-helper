// eslint-disable-next-line @typescript-eslint/no-var-requires
const helper = require('../lib/index')

helper({
  name: 'test',
  version: '1.0.0',
  entry: 'test/*.md',
  outDir: 'dist',
  reComponentName,
  reDocUrl,
  reAttribute,
  props: 'Attributes',
  propsName: 'Attribute',
  propsOptions: 'Accepted Values',
  eventsName: 'Event Name',
})

function reComponentName(title) {
  return 'app-' + title.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

function reDocUrl(fileName, header) {
  const docs = 'https://you.components/docs/'
  const _header = header ? header.replace(/[ ]+/g, '-') : undefined
  return docs + fileName + (_header ? '#' + header : '')
}

function reAttribute(str) {
  switch (str) {
    case '-':
    case '—':
      return undefined
    case 'v-model':
      return 'model-value'
    default:
      return str
  }
}
