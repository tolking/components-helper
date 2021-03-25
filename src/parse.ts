import type { Options } from './type'

function parse(options: Required<Options>, file: string) {
  const { titleRegExp, tableRegExp } = options
  const _file = normalizeFile(file)
  const titleContent = _file.match(new RegExp(titleRegExp))
  const tableContent = _file.match(new RegExp(tableRegExp, 'g'))
  const table = tableContent ? tableContent.map(item => parseTable(tableRegExp, item)) : undefined

  return {
    title: titleContent ? titleContent[1] : undefined,
    description: titleContent ? titleContent[2] : undefined,
    table
  }
}

function parseTable(regExp: string, str: string) {
  const tableHeader = str.match(new RegExp(regExp))
  const title = tableHeader ? tableHeader[1] : undefined
  const header = tableHeader ? parseColumn(tableHeader[2]) : undefined
  const columns = tableHeader ? tableHeader[3] : undefined
  let content = [] as Record<string, string>[]

  if (header && columns) {
    content = parseColumns(header, columns)
  }
  console.log(content)

  return {
    title,
    content,
  }
}

function parseColumn(str: string) {
  const list = str.split('|')
  let column = []

  for (let i = 0; i < list.length; i++) {
    const item = list[i].trim()

    item && column.push(item)
  }

  return column
}

function parseColumns(header: string[], str: string) {
  const list = str.split('\n')
  let columns = []

  for (let i = 0; i < list.length; i++) {
    const item = list[i]

    if (item) {
      const column = {} as Record<string, string>

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

function normalizeFile(file: string) {
  return file.replace(/\r\n/g, '\n')
}

export default parse
