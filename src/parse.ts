const RegTitle = /#+\s+(.*)\n+([^(#|\n)]*)/
const TableRegExp = '#+\\s*(.*)\\n+(\\|.+)\\n\\|\\s*-+.+\\n((\\|.+\\n)+)'
const RegTable = new RegExp(TableRegExp, 'g')
const RegSplitTable = new RegExp(TableRegExp)

export default function parse(file: string) {
  const _file = normalizeFile(file)
  const titleContent = _file.match(RegTitle)
  const tableContent = _file.match(RegTable)
  const table = tableContent ? tableContent.map(item => parseTable(item)) : undefined

  return {
    title: titleContent ? titleContent[1] : undefined,
    description: titleContent ? titleContent[2] : undefined,
    table
  }
}

function parseTable(str: string) {
  const tableHeader = str.match(RegSplitTable) // [_, title, header, columns]
  const title = tableHeader ? tableHeader[1] : undefined
  const header = tableHeader ? parseColumn(tableHeader[2]) : undefined
  const columns = tableHeader ? tableHeader[3] : undefined
  let content = [] as unknown as Record<string, string>[]

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
