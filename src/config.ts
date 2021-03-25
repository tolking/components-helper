import type { Config } from './type'

const config: Config = {
  titleRegExp: '#+\\s+(.*)\\n+([^(#|\\n)]*)',
  tableRegExp:
    '#+\\s+(.*)\\n+(\\|?.+\\|.+)\\n\\|?\\s*:?-+:?\\s*\\|.+\\n((\\|?.+\\|.+\\n)+)',
  fileNameRegExp: '\\/((\\w|-)+)\\.\\w+$',
  attributes: 'attributes',
  events: 'events',
  slots: 'slots',
  directives: 'directives',
}

export default config
