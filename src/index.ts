import { readFileSync } from 'fs'
import { resolve } from 'path'
import parse from './parse'
import type { Options } from './type'

export default function main(options: Options) {
  const file = readFileSync(resolve(__dirname, '../test/affix.md'), 'utf-8')

  const test = parse(file)
  console.log(test)
}
