import type { Config } from './type'

const config: Config = {
  tags: 'tags.json',
  attributes: 'attributes.json',
  webTypes: 'web-types.json',
  titleRegExp: '#+\\s+(.*)\\n+([^(#|\\n)]*)',
  tableRegExp:
    '#+\\s+(.*)\\n+(\\|?.+\\|.+)\\n\\|?\\s*:?-+:?\\s*\\|.+\\n((\\|?.+\\|.+\\n)+)',
  fileNameRegExp: '\\/((\\w|-)+)\\.\\w+$',
  emptyRegExp: '(-|—)',
  props: 'props',
  propsName: 'Name',
  propsType: 'Type',
  propsDescription: 'Description',
  propsOptions: 'Options',
  separator: '/',
  events: 'events',
  eventsName: 'Name',
  eventsDescription: 'Description',
  slots: 'slots',
  slotsName: 'Name',
  slotsDescription: 'Description',
  directives: 'directives',
  directivesName: 'Name',
  directivesType: 'Type',
  directivesDescription: 'Description',
}

export default config
