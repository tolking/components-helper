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
    propsDefault,
    separator,
    eventsName,
    eventsDescription,
  } = options
  const tagsList = {} as Tags
  const propsList = {} as Props

  for (let i = 0; i < list.length; i++) {
    const {
      title,
      description,
      path,
      fileName,
      props,
      events,
      slots,
      children,
    } = list[i]
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
    if (!name || (!props && !events && !slots)) continue

    _props.forEach((item) => {
      const _item = item[propsName]

      if (_item) {
        const _name = name + '/' + _item
        const _options = item[propsOptions]
        const _optionsList = _options
          ? _options.split(separator).map((item) => item.trim())
          : undefined

        tagsProps.push(_item)
        propsList[_name] = {
          options: _optionsList,
          type: item[propsType],
          description: reDescription(
            options,
            fileName,
            item[propsDescription],
            props?.title,
            item[propsDefault],
          ),
        }
      }
    })

    _events.forEach((item) => {
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
      description: reDescription(options, fileName, description, title),
    }
  }

  return { tags: tagsList, attributes: propsList }
}

function reDescription(
  options: Options,
  fileName: string,
  description?: string,
  header?: string,
  defaultVal?: string,
): string | undefined {
  const docUrl = getDocUrl(options, fileName, header)
  let str = description || ''

  if (defaultVal) {
    str += `${str ? str + ', ' : ''}default: ${defaultVal}`
  }
  if (docUrl) {
    str += `${str ? str + '\n\n' : ''}[Docs](${docUrl})`
  }

  return str ? str : undefined
}

export default vetur
