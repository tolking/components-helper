type ReComponentName = (title: string, fileName?: string, path?: string) => string

interface OptionsConfig {
  entry: string
  outDir: string
  prefix?: string
  reComponentName?: ReComponentName
  name: string
  version: number
  docs?: string
}

export interface Config {
  titleRegExp: string
  tableRegExp: string
  fileNameRegExp: string
  emptyRegExp: string
  attributes: string
  attributesProp: string
  attributesType: string
  attributesDescription: string
  attributesOptions: string
  separator: string
  events: string
  slots: string
  directives: string
}

export type InstallOptions = OptionsConfig & Partial<Config>

export type Options = OptionsConfig & Config

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

export interface Tags {
  [key: string]: {
    attributes: string[]
    description?: string
  }
}

export interface Attributes {
  [key: string]: {
    type?: string
    options?: string[]
    description?: string
  }
}
