import type { Options } from './type'

export function hyphenate(str: string): string {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

export function checkArray<T extends Array<unknown>>(item: T): T | undefined {
  return item && item.length ? item : undefined
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
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
): string | undefined {
  const { reDocUrl } = options
  return isFunction(reDocUrl) ? reDocUrl(fileName, header) : undefined
}
