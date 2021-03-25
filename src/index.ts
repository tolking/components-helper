// eslint-disable-next-line @typescript-eslint/no-var-requires
const fg = require('fast-glob')
import config from './config'
import read from './read'
import parse from './parse'
import normalize from './normalize'
import vetur from './vetur'
import type { InstallOptions, Options } from './type'

const main = (options = {} as InstallOptions): void => {
  const _options: Options = Object.assign(config, options)
  const files: string[] = fg.sync(_options.entry)
  const data = files.map((path) => {
    const fileContent = read(path)
    const parseContent = parse(_options, fileContent)
    const content = normalize(_options, parseContent, path)
    return content
  })
  const { tags, attributes } = vetur(_options, data)

  console.log(tags, attributes)
}

export default main
module.exports = main
