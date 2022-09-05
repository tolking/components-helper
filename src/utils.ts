import type { Options, Source, BaseContribution } from './type'

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

export function isCommonType(type: string): boolean {
  const typeList = [
    'undefined',
    'null',
    'string',
    'number',
    'boolean',
    'object',
    'array',
    'String',
    'Number',
    'Boolean',
    'Object',
    'Array(<.*>)?',
    'Function(\\(.*\\))?',
    'Symbol',
    'Date',
    'Map(<.*>)?',
    'Set(<.*>)?',
    'WeakMap(<.*>)?',
    'WeakSet(<.*>)?',
    'Promise(<.*>)?',
    'RegExp',
    'JSON',
    'ArrayBuffer',
    'DataView',
    'Int\\d+Array',
    'Uint\\d+Array',
    'Float\\d+Array',
    'BigInt\\d+Array',
    'BigUint\\d+Array',
    'Partial(<.*>)?',
    'Required(<.*>)?',
    'Readonly(<.*>)?',
    'Pick(<.*>)?',
    'Record(<.*>)?',
    'Exclude(<.*>)?',
    'Extract(<.*>)?',
    'Omit(<.*>)?',
    'ReturnType(<.*>)?',
    'InstanceType(<.*>)?',
    '(HTML.*)?Element',
  ]
  const regExp = arrayToRegExp(typeList)

  return regExp.test(getTypeSymbol(type))
}

export function isEnumType(type: string): boolean {
  return /^'\w*'$/.test(type) || /^"\w*"$/.test(type)
}

export function isUnionType(type: string): boolean {
  return /(\||&)/.test(type)
}

export function arrayToRegExp(arr: string[], flags?: string): RegExp {
  return new RegExp(`^(${arr.join('|')})$`, flags)
}

export function getTypeSymbol(type: string) {
  return type
    .replace(/\[\]$/, '')
    .replace(/<.*?>$/, '')
    .replace(/\{.*\}$/, '')
}

export function normalizeFile(file: string): string {
  return file.replace(/\r\n/g, '\n')
}

export function splitString(
  options: Pick<Options, 'separator'>,
  str?: string,
): string[] | undefined {
  if (!str) return undefined

  const { separator } = options
  return str.split(separator).map((item) => item.trim())
}

export function getComponentsName(
  options: Pick<Options, 'reComponentName'>,
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
  options: Pick<Options, 'reDocUrl'>,
  fileName: string,
  header?: string,
  path?: string,
): string | undefined {
  const { reDocUrl } = options
  return isFunction(reDocUrl) ? reDocUrl(fileName, header, path) : undefined
}

export function getVeturDescription(
  options: Pick<Options, 'reVeturDescription'>,
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
  options: Pick<Options, 'reWebTypesSource'>,
  title = '',
  fileName: string,
  path: string,
): Source {
  const { reWebTypesSource } = options
  return isFunction(reWebTypesSource)
    ? reWebTypesSource(title, fileName, path)
    : { symbol: title }
}

function getType(type: string): string | BaseContribution {
  const isEnum = isEnumType(type)
  const isPublicType = isCommonType(type)
  const symbol = getTypeSymbol(type)
  const isUnion = isUnionType(symbol)

  return isEnum || isPublicType || !symbol || isUnion
    ? type
    : { name: type, source: { symbol } }
}

export function getWebTypesType(
  options: Pick<Options, 'reWebTypesType' | 'separator'>,
  type?: string,
): undefined | Array<string | BaseContribution> {
  const { reWebTypesType } = options
  const list = splitString(options, type)

  if (list?.length) {
    const types = []

    for (let i = 0; i < list.length; i++) {
      const item = list[i].replaceAll('\\', '')
      const result = isFunction(reWebTypesType)
        ? reWebTypesType(item)
        : getType(item)

      result && types.push(result)
    }

    return types
  } else {
    return undefined
  }
}

export function filterVeturOptions(
  options: Pick<Options, 'separator'>,
  type?: string,
) {
  const list = splitString(options, type)

  if (list?.length) {
    const result = []

    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      const isEnum = isEnumType(item)
      const len = item.length

      isEnum && result.push(item.slice(1, len - 1))
    }

    return result
  } else {
    return undefined
  }
}
