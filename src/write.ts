import { resolve } from 'path'
import { mkdir, writeFileSync } from 'fs'
import type { Options, Tags, Props, WebTypes } from './type'

function write(
  options: Options,
  type: 'tags' | 'attributes' | 'webTypes',
  data: Tags | Props | WebTypes,
): void {
  const path = resolve(options.outDir, options[type])
  const buffer = JSON.stringify(data, null, options.space)

  writeFileRecursive(path, buffer)
}

function writeFileRecursive(path: string, buffer: string) {
  const lastPath = path.substring(0, path.lastIndexOf('/'))

  mkdir(lastPath, { recursive: true }, () => {
    writeFileSync(path, buffer)
  })
}

export default write
