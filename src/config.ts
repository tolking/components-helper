import type { Config } from './type'

const config: Config = {
  tags: 'tags.json',
  attributes: 'attributes.json',
  webTypes: 'web-types.json',
  titleRegExp: '#+\\s+(.*)\\n+([^(#|\\n)]*)',
  tableRegExp:
    '#+\\s+(.*)\\n+(\\|?.+\\|.+)\\n\\|?\\s*:?-+:?\\s*\\|.+((\\n\\|?.+\\|.+)+)',
  fileNameRegExp: '\\/((\\w|-)+)\\.\\w+$',
  separator: '/',
  props: 'props',
  propsName: 'Name',
  propsType: 'Type',
  propsDescription: 'Description',
  propsOptions: 'Options',
  propsDefault: 'Default',
  events: 'events',
  eventsName: 'Name',
  eventsDescription: 'Description',
  slots: 'slots',
  slotsName: 'Name',
  slotsDescription: 'Description',
  slotsSubtags: 'Subtags',
  directives: 'directives',
  directivesName: 'Name',
  directivesType: 'Type',
  directivesDescription: 'Description',
}

export default config
