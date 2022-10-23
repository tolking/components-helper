import {
  getComponentsName,
  getDocUrl,
  getWebTypesSource,
  checkArray,
  splitString,
  getWebTypesType,
} from './utils'
import type {
  Options,
  NormalizeData,
  WebTypes,
  WebElement,
  WebAttribute,
  WebEvent,
  BaseContribution,
} from './type'

export function webTypes(options: Options, list: NormalizeData[]): WebTypes {
  const { name, version } = options
  const { tags, attributes } = getWebTypes(options, list)

  return {
    $schema: 'http://json.schemastore.org/web-types',
    framework: 'vue',
    name,
    version,
    'js-types-syntax': 'typescript',
    'description-markup': 'markdown',
    contributions: {
      html: {
        'vue-components': tags,
        attributes,
      },
    },
  }
}

export function getWebTypes(options: Options, list: NormalizeData[]) {
  const {
    propsName,
    propsType,
    propsDescription,
    propsOptions,
    propsDefault,
    eventsName,
    eventsDescription,
    slotsName,
    slotsDescription,
    slotsType,
    directivesName,
    directivesType,
    directivesDescription,
  } = options
  let tagsList = [] as WebElement[]
  let directivesList = [] as WebAttribute[]

  for (let i = 0; i < list.length; i++) {
    const {
      title,
      description,
      fileName,
      path,
      props,
      events,
      slots,
      directives,
      children,
    } = list[i]
    const name = getComponentsName(options, title, fileName, path)
    const _props = props ? props.content : []
    const _events = events ? events.content : []
    const _slots = slots ? slots.content : []
    const _directives = directives ? directives.content : []
    const propsList = [] as WebAttribute[]
    const eventsList = [] as WebEvent[]
    const slotsList = [] as BaseContribution[]

    _directives.forEach((item) => {
      const _item = item[directivesName]

      if (_item) {
        directivesList.push({
          name: _item,
          source: getWebTypesSource(options, title, fileName, path),
          description: item[directivesDescription],
          'doc-url': getDocUrl(options, fileName, directives?.title, path),
          type: checkArray(getWebTypesType(options, item[directivesType])),
        })
      }
    })

    if (children && children.length) {
      const child = getWebTypes(options, children)

      if (child.tags) {
        tagsList = tagsList.concat(child.tags)
      }
      if (child.attributes) {
        directivesList = directivesList.concat(child.attributes)
      }
    }
    // Abandon the current data when missing the name or content
    if (!name || (!props && !events && !slots)) continue

    _props.forEach((item) => {
      const _item = item[propsName]

      if (_item) {
        const _optionsList = splitString(options, item[propsOptions])

        propsList.push({
          name: _item,
          description: item[propsDescription],
          'doc-url': getDocUrl(options, fileName, props?.title, path),
          type: checkArray(getWebTypesType(options, item[propsType])),
          default: item[propsDefault],
          'attribute-value': checkArray(_optionsList)
            ? {
                type: /^string$/i.test(item[propsType] || '')
                  ? 'enum'
                  : 'of-match',
              }
            : undefined,
          values: checkArray(_optionsList?.map((name) => ({ name }))),
        })
      }
    })

    _events.forEach((item) => {
      const _item = item[eventsName]

      if (_item) {
        eventsList.push({
          name: _item,
          description: item[eventsDescription],
          'doc-url': getDocUrl(options, fileName, events?.title, path),
        })
      }
    })

    _slots.forEach((item) => {
      const _item = item[slotsName]

      if (_item) {
        slotsList.push({
          name: _item,
          description: item[slotsDescription],
          'doc-url': getDocUrl(options, fileName, slots?.title, path),
          type: item[slotsType],
        })
      }
    })

    tagsList.push({
      name,
      source: getWebTypesSource(options, title, fileName, path),
      description,
      'doc-url': getDocUrl(options, fileName, title, path),
      props: checkArray(propsList),
      slots: checkArray(slotsList),
      js: checkArray(eventsList)
        ? { events: checkArray(eventsList) }
        : undefined,
    })
  }

  return {
    tags: checkArray(tagsList),
    attributes: checkArray(directivesList),
  }
}
