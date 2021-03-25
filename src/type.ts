export interface Options extends Partial<Config> {
  name: string
  version: number
  entry: string
  outDir: string
}

export interface Config {
  titleRegExp: string
  tableRegExp: string
}