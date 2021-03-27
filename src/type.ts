type ReComponentName = (title: string, fileName: string, path: string) => string

type ReDocUrl = (fileName: string, header?: string) => string

type ReAttribute = (str: string) => string | undefined

interface OptionsConfig {
  entry: string
  outDir: string
  name: string
  version: string
  reComponentName?: ReComponentName
  reDocUrl?: ReDocUrl
  reAttribute?: ReAttribute
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
}

export type InstallOptions = OptionsConfig & Partial<Config>

export type Options = OptionsConfig & Config

export type ParseTableColumn = Record<string, string | undefined>

export interface ParseTable {
  title: string
  content: ParseTableColumn[]
}

export interface ParseData {
  title?: string
  description?: string
  table?: ParseTable[]
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
    props: string[]
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
      tags: WebTag[]
      attributes: WebDirective[]
    }
  }
}
