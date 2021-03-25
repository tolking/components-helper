// eslint-disable-next-line @typescript-eslint/no-var-requires
const fg = require('fast-glob')
import config from './config'
import read from './read'
import parse from './parse'
import normalize from './normalize'
import type { Options } from './type'

const main = (options: Options = {} as Options): void => {
  const _options: Required<Options> = Object.assign(options, config)
  const files: string[] = fg.sync(_options.entry)
  const data = files.map((path) => {
    const fileContent = read(path)
    const parseContent = parse(_options, fileContent)
    const content = normalize(_options, parseContent, path)
    return content
  })

  console.log(data)
}

export default main
module.exports = main
