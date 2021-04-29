import { getComponentsName, getDocUrl, checkArray, isFunction } from './utils'
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
    reVeturDescription,
    subtagsMap,
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
        const docUrl = getDocUrl(options, fileName, props?.title, path)
        const _name = name + '/' + _item
        const _type = item[propsType] || ''
        const _options = item[propsOptions]
        const _optionsList =
          /string/i.test(_type) && _options
            ? _options.split(separator).map((item) => item.trim())
            : undefined
        const _description = isFunction(reVeturDescription)
          ? reVeturDescription(
              item[propsDescription],
              item[propsDefault],
              docUrl,
            )
          : reDescription(item[propsDescription], item[propsDefault], docUrl)

        tagsProps.push(_item)
        propsList[_name] = {
          type: item[propsType],
          options: _optionsList,
          description: _description,
        }
      }
    })

    _events.forEach((item) => {
      const _item = item[eventsName]

      if (_item) {
        const docUrl = getDocUrl(options, fileName, events?.title, path)
        const _name = name + '/' + _item
        const _description = isFunction(reVeturDescription)
          ? reVeturDescription(item[eventsDescription], undefined, docUrl)
          : reDescription(item[eventsDescription], undefined, docUrl)

        tagsProps.push(_item)
        propsList[_name] = {
          type: 'event',
          description: _description,
        }
      }
    })

    const docUrl = getDocUrl(options, fileName, events?.title, path)
    const _description = isFunction(reVeturDescription)
      ? reVeturDescription(description, undefined, docUrl)
      : reDescription(description, undefined, docUrl)

    tagsList[name] = {
      attributes: checkArray(tagsProps),
      subtags: subtagsMap[name],
      description: _description,
    }
  }

  return { tags: tagsList, attributes: propsList }
}

function reDescription(
  description?: string,
  defaultVal?: string,
  docUrl?: string,
): string | undefined {
  let str = description || ''

  if (defaultVal) {
    str += `${str ? ', ' : ''}default: ${defaultVal}.`
  }
  if (docUrl) {
    str += `${str ? '\n\n' : ''}[Docs](${docUrl})`
  }

  return str ? str : undefined
}

export default vetur
