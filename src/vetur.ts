import { getComponentsName, getDocUrl } from './utils'
import type { Options, NormalizeData, Tags, Props } from './type'

function vetur(
  options: Options,
  list: NormalizeData[],
): {
  tags: Tags
  attributes: Props
} {
  const {
    propsName,
    propsType,
    propsDescription,
    propsOptions,
    separator,
    eventsName,
    eventsDescription,
  } = options
  const tagsList = {} as Tags
  const propsList = {} as Props

  for (let i = 0; i < list.length; i++) {
    const { title, description, path, fileName, props, events, slots, children } = list[i]
    const name = getComponentsName(options, title, fileName, path)
    const _props = props ? props.content : []
    const _events = events ? events.content : []
    const tagsProps: string[] = []

    if (children && children.length) {
      const { tags, attributes } = vetur(options, children)
      Object.assign(tagsList, tags)
      Object.assign(propsList, attributes)
    }
    // Abandon the current data when missing the name or content
    if (!name || !props && !events && !slots) continue

    _props.forEach(item => {
      const _item = item[propsName]

      if (_item) {
        const _name = name + '/' + _item
        const options = item[propsOptions]
          .split(separator)
          .map(item => item.trim())

        tagsProps.push(_item)
        propsList[_name] = {
          options: options.length && options[0] ? options : undefined,
          type: item[propsType],
          description: item[propsDescription],
        }
      }
    })

    _events.forEach(item => {
      const _item = item[eventsName]

      if (_item) {
        const _name = name + '/' + _item

        tagsProps.push(_item)
        propsList[_name] = {
          type: 'event',
          description: item[eventsDescription],
        }
      }
    })

    tagsList[name] = {
      props: tagsProps,
      description: reDescription(options, fileName, description),
    }
  }

  return { tags: tagsList, attributes: propsList }
}

function reDescription(options: Options, fileName: string, description?: string, header?: string, defaultVal?: string) {
  const docUrl = getDocUrl(options, fileName, header)
  const _description = (description || ', ') + defaultVal + (docUrl ? `\n[Docs](${docUrl})` : '')
  return _description.replace(/^,/, '')
}

export default vetur
