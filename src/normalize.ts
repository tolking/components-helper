import { Options, NormalizeData, ParseTable } from "./type"

function normalize(options: Required<Options>, data: NormalizeData, path: string) {
  if (!data.table || !data.table.length) return
  const { fileNameRegExp, attributes, events, slots, directives } = options
  const _path = path.match(new RegExp(fileNameRegExp))
  const fileName = _path ? _path[1]: undefined
  const _attributes = new RegExp(attributes, 'i')
  const _events = new RegExp(events, 'i')

  data.path = path
  data.fileName = fileName

  for (let i = 0; i < data.table.length; i++) {
    const item = data.table[i]
    const title = item.title
    if (!title) continue

    if (_attributes.test(title)) {
      setData({
        data,
        item,
        path,
        fileName,
        title,
        key: 'attributes',
        regExp: _attributes,
      })
    } else if (_events.test(title)) {
      setData({
        data,
        item,
        path,
        fileName,
        title,
        key: 'events',
        regExp: _events,
      })
    } else {

    }
  }
console.log('-----------', data);

  return data
}

function setData({
  data,
  key,
  item,
  title,
  path,
  fileName,
  regExp,
}: {
  data: NormalizeData
  key: 'attributes' | 'events' | 'slots' | 'directives'
  item: ParseTable
  title: string
  path: string
  fileName?: string
  regExp: RegExp
}) {
  const childTitle = title.replace(regExp, '').trim()

  if (childTitle) {
    if (!data.children) {
      data.children = [{
        title: childTitle,
        path,
        fileName,
        [key]: item,
      }]
    } else {
      const child = data.children.find(item => item.title === childTitle)

      if (child) {
        child[key] = item
      } else {
        data.children.push({
          title: childTitle,
          path,
          fileName,
          [key]: item,
        })
      }
    }
  } else {
    data[key] = item
  }
}

export default normalize
