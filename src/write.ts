import { resolve } from 'path'
import { mkdir, writeFileSync } from 'fs'
import type { Options, Tags, Props, WebTypes } from './type'

export function write(
  options: Options,
  type: 'tags' | 'attributes' | 'webTypes',
  data: Tags | Props | WebTypes,
): void {
  const path = resolve(options.outDir, options[type])
  const buffer = JSON.stringify(data, null, options.space)

  mkdir(resolve(options.outDir), { recursive: true }, () => {
    writeFileSync(path, buffer)
  })
}
