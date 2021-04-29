type ReComponentName = (title: string, fileName: string, path: string) => string

type ReDocUrl = (fileName: string, header?: string, path?: string) => string

type ReAttribute = (
  value: string,
  key: string,
  columns: string[],
  title: string,
) => string | undefined

type ReVeturDescription = (
  description?: string,
  defaultValue?: string,
  docUrl?: string,
) => string

interface OptionsConfig {
  entry: string
  outDir: string
  name: string
  version: string
  space?: string | number
  reComponentName?: ReComponentName
  reDocUrl?: ReDocUrl
  reAttribute?: ReAttribute
  reVeturDescription?: ReVeturDescription
}

export interface Config {
  tags: string
  attributes: string
  webTypes: string
  titleRegExp: string
  tableRegExp: string
  fileNameRegExp: string
  props: string
  propsName: string
  propsType: string
  propsDescription: string
  propsOptions: string
  propsDefault: string
  separator: string
  events: string
  eventsName: string
  eventsDescription: string
  slots: string
  slotsName: string
  slotsDescription: string
  directives: string
  directivesName: string
  directivesType: string
  directivesDescription: string
  subtagsMap: SubTagsMap
}

export type InstallOptions = OptionsConfig & Partial<Config>

export type Options = OptionsConfig & Config

export interface ParseHeader {
  title?: string
  description?: string
}

export type ParseTableColumn = Record<string, string | undefined>

export interface ParseTable {
  title: string
  content: ParseTableColumn[]
}

export interface ParseData {
  title?: string
  description?: string
  table?: ParseTable[]
  headers?: ParseHeader[]
}

export interface NormalizeData extends ParseData {
  path: string
  fileName: string
  props?: ParseTable
  events?: ParseTable
  slots?: ParseTable
  directives?: ParseTable
  children?: NormalizeData[]
}

export interface Tags {
  [key: string]: {
    attributes?: string[]
    subtags?: string[]
    description?: string
  }
}

export interface Props {
  [key: string]: {
    type?: string
    options?: string[]
    description?: string
  }
}

export interface WebEvent {
  name: string
  description?: string
  'doc-url'?: string
}

export interface WebSlot {
  name: string
  description?: string
  'doc-url'?: string
}

export interface WebAttribute {
  name: string
  description?: string
  'doc-url'?: string
  default?: string
  value?: {
    type: string
    kind: string
  }
}

export interface WebTag {
  name: string
  description?: string
  'doc-url'?: string
  attributes?: WebAttribute[]
  events?: WebEvent[]
  slots?: WebSlot[]
}

export interface WebDirective {
  name: string
  description?: string
  'doc-url'?: string
  value?: {
    type: string
    kind: string
  }
}

export interface WebTypes {
  $schema: string
  framework: string
  name: string
  version: string
  contributions: {
    html: {
      'types-syntax': string
      'description-markup': string
      tags?: WebTag[]
      attributes?: WebDirective[]
    }
  }
}

export interface SubTagsMap {
  [propName: string]: string[]
}
