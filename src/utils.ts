import type { Options, Source } from './type'

export function hyphenate(str: string): string {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

export function checkArray<T extends Array<unknown>>(item?: T): T | undefined {
  return item?.length ? item : undefined
}

export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function normalizeFile(file: string): string {
  return file.replace(/\r\n/g, '\n')
}

export function splitString(
  options: Options,
  str?: string,
): string[] | undefined {
  if (!str) return undefined

  const { separator } = options
  return str.split(separator).map((item) => item.trim())
}

export function getComponentsName(
  options: Options,
  title = '',
  fileName: string,
  path: string,
): string {
  const { reComponentName } = options
  return isFunction(reComponentName)
    ? reComponentName(title, fileName, path)
    : hyphenate(title || fileName)
}

export function getDocUrl(
  options: Options,
  fileName: string,
  header?: string,
  path?: string,
): string | undefined {
  const { reDocUrl } = options
  return isFunction(reDocUrl) ? reDocUrl(fileName, header, path) : undefined
}

export function getVeturDescription(
  options: Options,
  description?: string,
  defaultVal?: string,
  docUrl?: string,
): string | undefined {
  const { reVeturDescription } = options

  if (isFunction(reVeturDescription)) {
    return reVeturDescription(description, defaultVal, docUrl)
  } else {
    let str = description || ''

    if (defaultVal) {
      str += `${str ? ', ' : ''}default: ${defaultVal}.`
    }
    if (docUrl) {
      str += `${str ? '\n\n' : ''}[Docs](${docUrl})`
    }

    return str ? str : undefined
  }
}

export function getWebTypesSource(
  options: Options,
  title = '',
  fileName: string,
  path: string,
): Source {
  const { name, reWebTypesSource } = options
  return isFunction(reWebTypesSource)
    ? reWebTypesSource(title, fileName, path)
    : { module: name, symbol: title }
}
