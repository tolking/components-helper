import { isFunction } from './utils'
import type { Options, ParseData, ParseTable, ParseTableColumn } from './type'

function parse(options: Options, file: string): ParseData {
  const { titleRegExp, tableRegExp } = options
  const _file = normalizeFile(file)
  const subTitles = []
  const _titleRegExp = new RegExp(titleRegExp)
  const titleContent = _file.match(_titleRegExp)
  if (titleContent && titleContent.length > 0) {
    let str = _file.substring(titleContent[0].length)
    let doFlag = true
    while (doFlag) {
      const subTitleContent = str.match(_titleRegExp)
      if (subTitleContent && subTitleContent.length > 0) {
        subTitles.push({
          title: subTitleContent ? subTitleContent[1].trim() : undefined,
          description: subTitleContent ? subTitleContent[2].trim() : undefined,
        })
        str = str.substring(
          (subTitleContent.index as number) + subTitleContent[0].length,
        )
      } else {
        doFlag = false
      }
    }
  }
  const tableContent = _file.match(new RegExp(tableRegExp, 'g'))
  const table = tableContent
    ? tableContent.map((item) => parseTable(options, item))
    : undefined

  return {
    title: titleContent ? titleContent[1].trim() : undefined,
    description: titleContent ? titleContent[2].trim() : undefined,
    table,
    subTitles,
  }
}

function parseTable(options: Options, str: string): ParseTable {
  const { tableRegExp } = options
  const tableContent = str.match(new RegExp(tableRegExp))
  const title = tableContent ? tableContent[1] : ''
  const header = tableContent ? parseColumn(tableContent[2]) : undefined
  const columns = tableContent ? tableContent[3] : undefined
  let content = [] as ParseTableColumn[]

  if (header && columns) {
    content = parseColumns(options, title, header, columns)
  }

  return {
    title,
    content,
  }
}

function parseColumn(str: string): string[] {
  return str
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .replace(/([^\\])\|/g, '$1 |')
    .replace(/\|\|/g, '| |')
    .split(/[^\\]\|/)
    .map((item) => item.replace(/\\\|/g, '|').trim())
}

function parseColumns(
  options: Options,
  title: string,
  header: string[],
  str: string,
): ParseTableColumn[] {
  const { reAttribute } = options
  const list = str.split('\n')
  const columns = [] as ParseTableColumn[]

  for (let i = 0; i < list.length; i++) {
    const item = list[i]

    if (item) {
      const column = {} as ParseTableColumn
      const list = parseColumn(item)

      list.forEach((value, index) => {
        const key = header[index]

        if (key) {
          column[key] = isFunction(reAttribute)
            ? reAttribute(value, key, list, title)
            : value
        }
      })

      columns.push(column)
    }
  }

  return columns
}

function normalizeFile(file: string): string {
  return file.replace(/\r\n/g, '\n')
}

export default parse
