export interface Options extends Partial<Config> {
  name: string
  version: number
  entry: string
  outDir: string
}

export interface Config {
  titleRegExp: string
  tableRegExp: string
  fileNameRegExp: string
  attributes: string
  events: string
  slots: string
  directives: string
}

export type ParseTableColumn = Record<string, string>

export interface ParseTable {
  title?: string
  content: ParseTableColumn[]
}

export interface ParseData {
  title?: string
  description?: string
  table?: ParseTable[]
}

export interface NormalizeData extends ParseData {
  path?: string
  fileName?: string
  attributes?: ParseTable
  events?: ParseTable
  slots?: ParseTable
  directives?: ParseTable
  children?: NormalizeData[]
}
