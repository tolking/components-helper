import type { Config } from './type'

const config: Config = {
  titleRegExp: '#+\\s+(.*)\\n+([^(#|\\n)]*)',
  tableRegExp:
    '#+\\s+(.*)\\n+(\\|?.+\\|.+)\\n\\|?\\s*:?-+:?\\s*\\|.+\\n((\\|?.+\\|.+\\n)+)',
  fileNameRegExp: '\\/((\\w|-)+)\\.\\w+$',
  emptyRegExp: '(-|—)',
  attributes: 'attributes',
  attributesProp: 'Attribute',
  attributesType: 'Type',
  attributesDescription: 'Description',
  attributesOptions: 'options',
  separator: '/',
  events: 'events',
  slots: 'slots',
  directives: 'directives',
}

export default config
