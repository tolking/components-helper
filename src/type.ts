import type { Options as FastGlobConfig } from 'fast-glob'

export type ReComponentName = (
  title: string,
  fileName: string,
  path: string,
) => string

export type ReDocUrl = (
  fileName: string,
  header?: string,
  path?: string,
) => string | undefined

export type ReAttribute = (
  value: string,
  key: string,
  columns: string[],
  title: string,
) => string | undefined

export type ReVeturDescription = (
  description?: string,
  defaultValue?: string,
  docUrl?: string,
) => string | undefined

export type ReWebTypesSource = (
  title: string,
  fileName: string,
  path: string,
) => Source

export type ReWebTypesType = (
  type: string,
) => undefined | string | BaseContribution

export interface OptionsConfig {
  entry: string | string[]
  fastGlobConfig?: FastGlobConfig
  outDir: string
  name: string
  version: string
  space?: string | number
  reComponentName?: ReComponentName
  reDocUrl?: ReDocUrl
  reAttribute?: ReAttribute
  reVeturDescription?: ReVeturDescription
  reWebTypesSource?: ReWebTypesSource
  reWebTypesType?: ReWebTypesType
}

export interface Config {
  tags: string
  attributes: string
  webTypes: string
  titleRegExp: RegExp | string
  tableRegExp: RegExp | string
  fileNameRegExp: RegExp | string
  separator: string
  props: string
  propsName: string
  propsType: string
  propsDescription: string
  propsOptions: string
  propsDefault: string
  events: string
  eventsName: string
  eventsDescription: string
  slots: string
  slotsName: string
  slotsDescription: string
  slotsType: string
  slotsSubtags: string
  directives: string
  directivesName: string
  directivesType: string
  directivesDescription: string
}

export type InstallOptions = OptionsConfig & Partial<Config>

export type Options = OptionsConfig & Config

export interface ParseHeader {
  title?: string
  description?: string
}

export type ParseTableColumn = Record<string, string | undefined>

export interface ParseTable {
  title: string
  content: ParseTableColumn[]
}

export interface ParseData {
  title?: string
  description?: string
  table?: ParseTable[]
  headers?: ParseHeader[]
}

export interface NormalizeData extends ParseData {
  path: string
  fileName: string
  props?: ParseTable
  events?: ParseTable
  slots?: ParseTable
  directives?: ParseTable
  children?: NormalizeData[]
}

export interface Tags {
  [key: string]: {
    attributes?: string[]
    subtags?: string[]
    description?: string
  }
}

export interface Props {
  [key: string]: {
    type?: string
    options?: string[]
    description?: string
  }
}

/**
 * Language in which JavaScript objects types are specified.
 */
export type JsTypesSyntax = 'typescript'
/**
 * Markup language in which descriptions are formatted.
 */
export type DescriptionMarkup = 'html' | 'markdown' | 'none'
/**
 * A RegEx pattern to match whole content. Syntax should work with at least ECMA, Java and Python implementations.
 */
export type Pattern =
  | string
  | {
      regex?: string
      'case-sensitive'?: boolean
      [k: string]: unknown
    }
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^/(html|css|js)/[^/\n\r]+$".
 */
export type NameConverter =
  | 'as-is'
  | 'PascalCase'
  | 'camelCase'
  | 'lowercase'
  | 'UPPERCASE'
  | 'kebab-case'
  | 'snake_case'
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^/(html|css|js)/[^/\n\r]+$".
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^/(html|css|js)/[^/\n\r]+$".
 */
export type NameConverters = NameConverter[]
/**
 * Relative path to the icon representing the symbol.
 */
export type Icon = string
/**
 * Contains contributions to HTML namespace. It's property names represent symbol kinds, its property values contain list of contributions of particular kind. There are 2 predefined kinds, which integrate directly with IDE - HTML elements and HTML attributes. There are also 2 deprecated kinds: tags (which is equivalent to 'elements') and 'events' (which was moved to JS namespace)
 */
export type Html = HtmlContributionsHost
export type WebElement = BaseContribution & HtmlContributionsHost
export type Name = string
/**
 * Short description to be rendered in documentation popup. It will be rendered according to description-markup setting.
 */
export type Description = string
/**
 * Link to online documentation.
 */
export type DocUrl = string
/**
 * Allows to specify the source of the entity. For Vue.js component this may be for instance a class.
 */
export type Source =
  | {
      /**
       * Path to the file, relative to the web-types JSON.
       */
      file: string
      /**
       * Offset in the file under which the source symbol, like class name, is located.
       */
      offset: number
    }
  | {
      /**
       * Name of module, which exports the symbol. May be omitted, in which case it's assumed to be the name of the library.
       */
      module?: string
      /**
       * Name of the exported symbol.
       */
      symbol: string
    }
export type Deprecated = boolean
export type Experimental = boolean
export type Priority = 'lowest' | 'low' | 'normal' | 'high' | 'highest'
export type Proximity = number
/**
 * Mark contribution as virtual. Virtual contributions can be filtered out if needed in references. A virtual contribution meaning may differ by framework or kind contexts, but usually means something synthetic or something, which gets erased in the runtime by the framework. E.g. Vue or Angular attribute bindings are virtual.
 */
export type Virtual = boolean
/**
 * Mark contribution as abstract. Such contributions serve only as super contributions for other contributions.
 */
export type Abstract = boolean
/**
 * Mark contribution as an extension. Such contributions do not define a new contribution on their own, but can provide additional properties or contributions to existing contributions.
 */
export type Extension = boolean
/**
 * A reference to an element in Web-Types model.
 */
export type Reference = ReferenceWithProps | string
export type NamePatternRoot = NamePattern | string
export type NamePattern =
  | {
      required?: Required
      unique?: boolean
      repeat?: boolean
      template?: NamePatternTemplate
      or?: NamePatternTemplate
      delegate?: Reference
      deprecated?: Deprecated
      priority?: Priority
      proximity?: Proximity
      items?: ListReference
    }
  | {
      regex: string
      'case-sensitive'?: boolean
    }
export type Required = boolean
export type NamePatternTemplate = [
  string | NamePatternTemplate | NamePattern,
  ...(string | NamePatternTemplate | NamePattern)[],
]
/**
 * A reference to an element in Web-Types model.
 */
export type ListReference = Reference | Reference[]
/**
 * Contains contributions to CSS namespace. It's property names represent symbol kinds, its property values contain list of contributions of particular kind. There are 5 predefined kinds, which integrate directly with IDE - properties, classes, functions, pseudo-elements and pseudo-classes.
 */
export type Css = CssContributionsHost
export type CssProperty = BaseContribution & CssContributionsHost
export type CssPseudoElement = BaseContribution & CssContributionsHost
export type CssPseudoClass = BaseContribution & CssContributionsHost
export type CssGenericItem = BaseContribution & CssContributionsHost
export type GenericCssContribution = GenericContribution & CssContributionsHost
/**
 * A generic contribution. All contributions are of this type, except for HTML attributes and elements, as well as predefined CSS contribution kinds.
 */
export type GenericContribution = TypedContribution
/**
 * The base for any contribution, which can possibly have a JS type.
 */
export type TypedContribution = BaseContribution
/**
 * Contains contributions to JS namespace. It's property names represent symbol kinds, its property values contain list of contributions of particular kind. There are 2 predefined kinds, which integrate directly with IDE - properties and events.
 */
export type Js = JsContributionsHost
export type WebEvent = GenericContribution & JsContributionsHost
/**
 * Specify list of contribution kinds qualified with a namespace, for which during reference resolution this will be the final contribution host. E.g. if a special HTML element does not accept standard attributes, add:
 * "exclusive-contributions": ["/html/attributes"].
 */
export type ExclusiveContributions = string[]
export type WebAttribute = BaseContribution & HtmlContributionsHost
/**
 * This interface was referenced by `HtmlContributionsHost`'s JSON-Schema definition
 * via the `patternProperty` "^(?!pattern$).*$".
 */
export type GenericHtmlContributions =
  | GenericHtmlContributionOrProperty
  | GenericHtmlContributionOrProperty[]
export type GenericHtmlContributionOrProperty = string | number | boolean

export interface WebTypes {
  $schema?: string
  /**
   * Framework, for which the components are provided by the library. If the library is not enabled in a particular context, all symbols from this file will not be available as well. If you want symbols to be always available do not specify framework.
   */
  framework?: string
  /**
   * Name of the library.
   */
  name: string
  /**
   * Version of the library, for which Web-Types are provided.
   */
  version: string
  'js-types-syntax'?: JsTypesSyntax
  'description-markup'?: DescriptionMarkup
  'framework-config'?: FrameworkConfig
  'default-icon'?: Icon
  /**
   * Symbol can be contributed to one of the 3 namespaces - HTML, CSS and JS. Within a particular namespace there can be different kinds of symbols. In each of the namespaces, there are several predefined kinds, which integrate directly with IDE, but providers are free to define their own.
   */
  contributions?: {
    html?: Html
    css?: Css
    js?: Js
  }
}
/**
 * Provide configuration for the specified web framework. This is an advanced feature, which is used to provide support for templating frameworks like Angular, Vue, Svelte, etc.
 */
export interface FrameworkConfig {
  'enable-when'?: EnablementRules
  'disable-when'?: DisablementRules
  /**
   * In many frameworks symbols can have multiple versions of a name. Specify canonical name conversion rule for names of particular symbol kinds against which comparisons will be made. Format of the 'canonical-names' property names is '{namespace}/{symbol kind}'. By default symbol names in HTML namespace are converted to lower-case, and in CSS and JS namespaces are left as-is. In case of name patterns, rules are applied to each part of the pattern separately, so even if the symbol with pattern is in HTML namespace, references to JS events will be case-sensitive.
   */
  'canonical-names'?: {
    [k: string]: NameConverter
  }
  /**
   * Provide an array of name conversions, in which particular symbol kinds should be matched against canonical names of symbols. By default symbol names are converted using canonical-names rule.
   */
  'match-names'?: {
    [k: string]: NameConverters
  }
  /**
   * Provide an array of name conversions, in which particular symbol kinds should be proposed in auto completion. Format of the 'name-variants' property names is '{namespace}/{symbol kind}'. All symbol kinds are by default provided as-is.
   */
  'name-variants'?: {
    [k: string]: NameConverters
  }
}
/**
 * Specify rules for enabling web framework support. Only one framework can be enabled in a particular file. If you need your contributions to be enabled in all files, regardless of the context, do not specify the framework.
 */
export interface EnablementRules {
  /**
   * Node.js package names, which enable framework support within the folder containing the package.json.
   */
  'node-packages'?: string[]
  /**
   * RegExps to match script URLs, which enable framework support within a particular HTML.
   */
  'script-url-patterns'?: Pattern[]
  /**
   * Extensions of files, which should have the framework support enabled. Use this to support custom file extensions like '.vue' or '.svelte'. Never specify generic extensions like '.html', '.js' or '.ts'. If you need your contributions to be present in every file don't specify the framework at all
   */
  'file-extensions'?: string[]
  /**
   * RegExp patterns to match file names, which should have the framework support enabled. Use carefully as broken pattern may even freeze IDE.
   */
  'file-name-patterns'?: Pattern[]
  /**
   * Global JavaScript libraries names enabled within the IDE, which enable framework support in the whole project
   */
  'ide-libraries'?: string[]
}
/**
 * Specify rules for disabling web framework support. These rules take precedence over enable-when rules. They allow to turn off framework support in case of some conflicts between frameworks priority.
 */
export interface DisablementRules {
  /**
   * Extensions of files, which should have the framework support disabled
   */
  'file-extensions'?: string[]
  /**
   * RegExp patterns to match file names, which should have the framework support disabled
   */
  'file-name-patterns'?: Pattern[]
}
export interface HtmlContributionsHost {
  /**
   * HTML elements.
   */
  elements?: WebElement[]
  /**
   * HTML attributes.
   */
  attributes?: WebAttribute[]
  /**
   * for Vue
   */
  'vue-components'?: WebElement[]
}
/**
 * The base for any contributions.
 */
export interface BaseContribution {
  name?: Name
  description?: Description
  'description-sections'?: DescriptionSections
  'doc-url'?: DocUrl
  icon?: Icon
  source?: Source
  deprecated?: Deprecated
  experimental?: Experimental
  priority?: Priority
  proximity?: Proximity
  virtual?: Virtual
  abstract?: Abstract
  extension?: Extension
  extends?: Reference
  pattern?: NamePatternRoot
  html?: Html
  css?: Css
  js?: Js
  'exclusive-contributions'?: ExclusiveContributions
  [k: string]: unknown
}
/**
 * Custom sections to be shown below description in the documentation popup.
 */
export interface DescriptionSections {
  [k: string]: string
}
export interface ReferenceWithProps {
  path: string
  includeVirtual?: boolean
  includeAbstract?: boolean
  filter?: string
  [k: string]: unknown
}
export interface CssContributionsHost {
  /**
   * CSS properties
   */
  properties?: CssProperty[]
  /**
   * CSS pseudo-elements
   */
  'pseudo-elements'?: CssPseudoElement[]
  /**
   * CSS pseudo-classes
   */
  'pseudo-classes'?: CssPseudoClass[]
  /**
   * CSS functions
   */
  functions?: CssGenericItem[]
  /**
   * CSS classes
   */
  classes?: CssGenericItem[]
}
export interface JsContributionsHost {
  /**
   * DOM events
   */
  events?: WebEvent[]
  /**
   * JavaScript properties of an object, HTML tag, framework component, etc.
   */
  properties?: WebEvent[]
}
