import type { Options, ParseData, ParseTable, ParseTableColumn } from './type'

function parse(options: Required<Options>, file: string): ParseData {
  const { titleRegExp, tableRegExp } = options
  const _file = normalizeFile(file)
  const titleContent = _file.match(new RegExp(titleRegExp))
  const tableContent = _file.match(new RegExp(tableRegExp, 'g'))
  const table = tableContent
    ? tableContent.map((item) => parseTable(tableRegExp, item))
    : undefined

  return {
    title: titleContent ? titleContent[1] : undefined,
    description: titleContent ? titleContent[2] : undefined,
    table,
  }
}

function parseTable(regExp: string, str: string): ParseTable {
  const tableHeader = str.match(new RegExp(regExp))
  const title = tableHeader ? tableHeader[1] : undefined
  const header = tableHeader ? parseColumn(tableHeader[2]) : undefined
  const columns = tableHeader ? tableHeader[3] : undefined
  let content = [] as ParseTableColumn[]

  if (header && columns) {
    content = parseColumns(header, columns)
  }

  return {
    title,
    content,
  }
}

function parseColumn(str: string): string[] {
  const list = str.split('|')
  const column = []

  for (let i = 0; i < list.length; i++) {
    const item = list[i].trim()

    item && column.push(item)
  }

  return column
}

function parseColumns(header: string[], str: string): ParseTableColumn[] {
  const list = str.split('\n')
  const columns = [] as ParseTableColumn[]

  for (let i = 0; i < list.length; i++) {
    const item = list[i]

    if (item) {
      const column = {} as ParseTableColumn

      parseColumn(item).forEach((element, index) => {
        const key = header[index]

        if (key) {
          column[header[index]] = element
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
