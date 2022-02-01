import { isFunction, isString, normalizeFile } from './utils'
import type {
  Options,
  ParseData,
  ParseHeader,
  ParseTable,
  ParseTableColumn,
} from './type'

export function parse(options: Options, file: string): ParseData {
  const _file = normalizeFile(file)
  const headers = parseTitle(options, _file)
  const topHeader = headers && headers.length ? headers[0] : undefined
  const table = parseTable(options, _file)

  return {
    title: topHeader ? topHeader.title : undefined,
    description: topHeader ? topHeader.description : undefined,
    table,
    headers,
  }
}

export function parseTitle(options: Options, str: string): ParseHeader[] {
  const { titleRegExp } = options
  const _titleRegExp = isString(titleRegExp)
    ? new RegExp(titleRegExp, 'g')
    : titleRegExp
  const titleContent = str.matchAll(_titleRegExp)

  return Array.from(titleContent, (item) => ({
    title: item[1].trim(),
    description: item[2].trim(),
  }))
}

export function parseTable(options: Options, str: string): ParseTable[] {
  const { tableRegExp } = options
  const _tableRegExp = isString(tableRegExp)
    ? new RegExp(tableRegExp, 'g')
    : tableRegExp
  const tableContent = str.matchAll(_tableRegExp)

  return Array.from(tableContent, (item) => {
    const title = item ? item[1] : ''
    const header = item ? parseRow(item[2]) : undefined
    const columns = item ? item[3] : undefined
    let content = [] as ParseTableColumn[]

    if (header && columns) {
      content = parseColumns(options, title, header, columns)
    }
    return { title, content }
  })
}

export function parseRow(str: string): string[] {
  return str
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .replace(/([^\\])\|/g, '$1 |')
    .replace(/\|\|/g, '| |')
    .split(/[^\\]\|/)
    .map((item) => item.replace(/\\\|/g, '|').trim())
}

export function parseColumns(
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
      const list = parseRow(item)

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
