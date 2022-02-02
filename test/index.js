// eslint-disable-next-line @typescript-eslint/no-var-requires
const helper = require('../lib/index').default

helper({
  name: 'test',
  version: '1.0.0',
  entry: 'test/*.md',
  outDir: 'dist',
  reComponentName,
  reDocUrl,
  reAttribute,
  reWebTypesSource,
  space: 2,
  tableRegExp:
    /#+\s+(.*\s*Props|.*\s*Events|.*\s*Slots|.*\s*Directives)\n+(\|?.+\|.+)\n\|?\s*:?-+:?\s*\|.+((\n\|?.+\|.+)+)/g,
})

function reComponentName(title) {
  return (
    'app-' +
    title
      .replace(/\B([A-Z])/g, '-$1')
      .replace(/[ ]+/g, '-')
      .toLowerCase()
  )
}

function reWebTypesSource(title) {
  const symbol =
    'App' +
    title
      .replace(/-/, ' ')
      .replace(/^\w|\s+\w/g, (item) => item.trim().toUpperCase())

  return { symbol }
}

function reDocUrl(fileName, header) {
  const docs = 'https://you.components/docs/'
  const _header = header ? header.replace(/[ ]+/g, '-') : undefined
  return docs + fileName + (_header ? '#' + _header : '')
}

function reAttribute(str, key) {
  switch (str) {
    case '':
    case '-':
    case '—':
      return undefined
    case 'v-model':
      return 'model-value'
    default:
      if (key === 'Subtags') {
        return str
          ? str
              .split('/')
              .map((name) => reComponentName(name.trim()))
              .join('/')
          : str
      } else {
        return str
      }
  }
}
