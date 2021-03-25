import { readFileSync } from 'fs'
import { resolve } from 'path'
import config from './config'
import parse from './parse'
import type { Options } from './type'

const main = (options: Options = {} as Options) => {
  const _options: Required<Options> = Object.assign(options, config)

  const file = readFileSync(resolve(__dirname, '../test/affix.md'), 'utf-8')

  const test = parse(_options, file)
  console.log(test)
}

export default main
module.exports = main
