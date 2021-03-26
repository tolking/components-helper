import { getComponentsName, getDocUrl } from './utils'
import type { Options, NormalizeData, WebTypes, WebTag, WebDirective, WebAttribute, WebEvent, WebSlot } from './type'

function webTypes(options: Options, list: NormalizeData[]): WebTypes {
  const { name, version } = options
  const { tags, attributes } = getWebTypes(options, list)

  return {
    $schema: 'http://json.schemastore.org/web-types',
    framework: 'vue',
    name,
    version,
    contributions: {
      html: {
        'types-syntax': 'typescript',
        'description-markup': 'markdown',
        tags,
        attributes,
      }
    }
  }
}

function getWebTypes(options: Options, list: NormalizeData[]) {
  const { propsName, propsType, propsDescription, eventsName, eventsDescription, slotsName, slotsDescription, directivesName, directivesType, directivesDescription } = options
  let tagsList = [] as WebTag[]
  let directivesList = [] as WebDirective[]

  for (let i = 0; i < list.length; i++) {
    const { title, description, fileName, path, props, events, slots, directives, children } = list[i]
    const name = getComponentsName(options, title, fileName, path)
    const _props = props ? props.content : []
    const _events = events ? events.content : []
    const _slots = slots ? slots.content : []
    const _directives = directives? directives.content : []
    const propsList = [] as WebAttribute[]
    const eventsList = [] as WebEvent[]
    const slotsList = [] as WebSlot[]

    if (children && children.length) {
      const child = getWebTypes(options, children)
      tagsList = tagsList.concat(child.tags)
      directivesList = directivesList.concat(child.attributes)
    }
    // Abandon the current data when missing the name or content
    if (!name || !props && !events && !slots && !directives) continue

    _props.forEach(item => {
      const _item = item[propsName]

      if (_item) {
        propsList.push({
          name: _item,
          description: item[propsDescription],
          'doc-url': getDocUrl(options, fileName, props?.title),
          value: item[propsType] ? {
            type: item[propsType],
            kind: 'expression',
          } : undefined
        })
      }
    })

    _events.forEach(item => {
      const _item = item[eventsName]

      if (_item) {
        eventsList.push({
          name: _item,
          description: item[eventsDescription],
          'doc-url': getDocUrl(options, fileName, events?.title),
        })
      }
    })

    _slots.forEach(item => {
      const _item = item[slotsName]

      if (_item) {
        slotsList.push({
          name: _item,
          description: item[slotsDescription],
          'doc-url': getDocUrl(options, fileName, slots?.title),
        })
      }
    })

    _directives.forEach(item => {
      const _item = item[directivesName]

      if (_item) {
        directivesList.push({
          name: _item,
          description: item[directivesDescription],
          'doc-url': getDocUrl(options, fileName, directives?.title),
          value: item[directivesType] ? {
            type: item[directivesType],
            kind: 'expression',
          } : undefined
        })
      }
    })

    tagsList.push({
      name,
      description,
      'doc-url': getDocUrl(options, fileName),
      attributes: propsList,
      events: eventsList,
      slots: slotsList,
    })
  }

  return { tags: tagsList, attributes: directivesList }
}

export default webTypes
