import {
  getComponentsName,
  getDocUrl,
  getVeturDescription,
  checkArray,
} from './utils'
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
    slotsSubtags,
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
    const _slots = slots ? slots.content : []
    const tagsProps: string[] = []
    let subtags: string[] = []

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
        const _description = getVeturDescription(
          options,
          item[propsDescription],
          item[propsDefault],
          docUrl,
        )

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
        const _description = getVeturDescription(
          options,
          item[eventsDescription],
          undefined,
          docUrl,
        )

        tagsProps.push(_item)
        propsList[_name] = {
          type: 'event',
          description: _description,
        }
      }
    })

    _slots.forEach((item) => {
      const _subtags = item[slotsSubtags]
      const _subtagsList = _subtags
        ? _subtags.split(separator).map((item) => item.trim())
        : undefined

      if (_subtagsList) {
        subtags = subtags.concat(_subtagsList)
      }
    })

    const docUrl = getDocUrl(options, fileName, title, path)
    const _description = getVeturDescription(
      options,
      description,
      undefined,
      docUrl,
    )

    tagsList[name] = {
      attributes: checkArray(tagsProps),
      subtags: checkArray(subtags),
      description: _description,
    }
  }

  return { tags: tagsList, attributes: propsList }
}

export default vetur
