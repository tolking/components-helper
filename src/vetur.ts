import { Options, NormalizeData, Tags, Attributes } from './type'

function vetur(
  options: Options,
  list: NormalizeData[],
): {
  tags: Tags
  attributes: Attributes
} {
  const {
    prefix,
    reComponentName,
    attributesProp,
    attributesType,
    attributesDescription,
    attributesOptions,
    separator,
  } = options
  const tagsList = {} as Tags
  const attributesList = {} as Attributes

  for (let i = 0; i < list.length; i++) {
    const { title, description, path, fileName, attributes, events } = list[i]

    if (!title) continue
    const name =
      prefix ||
      '' +
        (typeof reComponentName === 'function'
          ? reComponentName(title, fileName, path)
          : hyphenate(title))
    const _attributes = attributes ? attributes.content : []
    const _events = events ? events.content : []
    const tagsAttributes: string[] = []

    _attributes.forEach(item => {
      const _item = item[attributesProp]

      if (_item) {
        const _name = name + '/' + _item
        const options = item[attributesOptions]
          .split(separator)
          .map(item => item.trim())

        tagsAttributes.push(_item)
        attributesList[_name] = {
          options: options.length && options[0] ? options : undefined,
          type: item[attributesType],
          description: item[attributesDescription],
        }
      }
    })

    tagsList[name] = {
      attributes: tagsAttributes,
      description,
    }
  }

  return { tags: tagsList, attributes: attributesList }
}

function hyphenate(str: string) {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

export default vetur
