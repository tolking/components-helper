# components-helper

> Based on the documents to provide code prompt files for vue component library

Reference documents format reference test files

[Changelog](./CHANGELOG.md)

## Installation

``` sh
yarn add components-helper -D
# or
npm i components-helper --save-dev
```

## Usage

``` js
const helper = require('components-helper')

helper({
  // Options
})
```

[example](./test/index.js)

then in package.json

``` diff
{
  "scripts": {
+    "build:helper": "node helper/file.js"
  },
+  "vetur": {
+    "tags": "config outDir/tags.json",
+    "attributes": "config outDir/attributes.json"
+  },
+  "web-types": "config outDir/web-types.json"
}
```

## Options

<details>
<summary>TOC</summary>
<br>

- [entry (required)](#entry)
- [outDir (required)](#outdir)
- [name (required)](#name)
- [version (required)](#version)
- [space](#space)
- [separator](#separator)
- [reComponentName](#recomponentname)
- [reDocUrl](#redocurl)
- [reAttribute](#reattribute)
- [reVeturDescription](#reveturdescription)
- [reWebTypesSource](#rewebtypessource)
- [tags](#tags)
- [attributes](#attributes)
- [webTypes](#webtypes)
- [props](#props)
- [propsName](#propsname)
- [propsDescription](#propsdescription)
- [propsType](#propstype)
- [propsOptions](#propsoptions)
- [propsDefault](#propsdefault)
- [events](#events)
- [eventsName](#eventsname)
- [eventsDescription](#eventsdescription)
- [slots](#slots)
- [slotsName](#slotsname)
- [slotsDescription](#slotsdescription)
- [slotsSubtags](#slotssubtags)
- [directives](#directives)
- [directivesName](#directivesname)
- [directivesDescription](#directivesdescription)
- [directivesType](#directivestype)
- [titleRegExp](#titleregexp)
- [tableRegExp](#tableregexp)
- [fileNameRegExp](#filenameregexp)

<br>
</details>

### entry

- Required: `true`
- Type: `string`

entry path, refer: [fast-glob](https://github.com/mrmlnc/fast-glob#pattern-syntax)

for example:
  - `docs/*.md` -- matches all files in the docs
  - `docs/(a|b).md` -- matches files `a.md` and `b.md`
  - `docs/!(a|b).md` -- matches files except `a.md` and `b.md`

### outDir

- Required: `true`
- Type: `string`

outDir path

For example: `lib`

### name

- Required: `true`
- Type: `string`

name of the component library. 

### version

- Required: `true`
- Type: `string`

version of the component library. 

### space

- Type: `number` | `string`

Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read

### separator

- Type: `string`
- Default: `/`

the separator for propsOptions, slotsSubtags, type ...

### reComponentName

- Type: `(title: string, fileName: string, path: string) => string`
- Defult: `hyphenate(title || fileName)`

rewriting the name of the component

for example: `(title) => 'prefix-' + title.replace(/\B([A-Z])/g, '-$1').toLowerCase()`

### reDocUrl

- Type: `(fileName: string, header?: string, path: string) => string | undefind`

rewriting the doc url of the component

### reAttribute

- Type: `(value: string, key: string, row: string[], title: string) => string | undefined`

##### arg

- value: current value
- key: the key value of the current column
- row: all values of the current row
- title: the title of current tabel

rewriting the attribute of the component

### reVeturDescription

- Type: `(description?: string, defaultValue?: string, docUrl?: string) => string`
- Default: same like `${description}, default: ${defaultValue}.\n\n[Docs](${docUrl})`

rewriting the description of vetur

### reWebTypesSource

- Type: `(title: string, fileName: string, path: string) => { module?: string; symbol: string } | { file: string; offset: number }`
- Default: `{ symbol: title }`

rewriting the source of web-types. (the name of export from conmonents library)

### tags

- Type: `string`
- Default: `tags.json`

name for tags of the vetur

### attributes

- Type: `string`
- Default: `attributes.json`

name for attributes of the vetur

### webTypes

- Type: `string`
- Default: `web-types.json`

name for web-types of the webstrom

### props

- Type: `string` (**This is a regular string and ignores case.**)
- Default: `props`

name of props table. **other string in the header will be identified as sub-component**

### propsName

- Type: `string`
- Default: `Name`

name for props header name

### propsDescription

- Type: `string`
- Default: `Description`

name for props header description

### propsType

- Type: `string`
- Default: `Type`

name for props header type

### propsOptions

- Type: `string`
- Default: `Options`

name for props header options

### propsDefault

- Type: `string`
- Default: `Default`

name for props header default

### events

- Type: `string` (**This is a regular string and ignores case.**)
- Default: `events`

name of events table. **other string in the header will be identified as sub-component**

### eventsName

- Type: `string`
- Default: `Name`

name for events header name

### eventsDescription

- Type: `string`
- Default: `Description`

name for events header description

### slots

- Type: `string` (**This is a regular string and ignores case.**)
- Default: `slots`

name of slots table. **other string in the header will be identified as sub-component**

### slotsName

- Type: `string`
- Default: `Name`

name for slots header name

### slotsDescription

- Type: `string`
- Default: `Description`

name for slots header description

### slotsSubtags

- Type: `string`
- Default: `Subtags`

name for slots header subtags

### directives

- Type: `string` (**This is a regular string and ignores case.**)
- Default: `directives`

name of directives table. **other string in the header will be identified as sub-component**

### directivesName

- Type: `string`
- Default: `Name`

name for directives header name

### directivesDescription

- Type: `string`
- Default: `Description`

name for directives header description

### directivesType

- Type: `string`
- Default: `Type`

name for directives header type

### titleRegExp

- Type: `string` (**This is a regular string.**)
- Default: `#+\\s+(.*)\\n+([^(#|\\n)]*)`

matches the title and description information from docs

### tableRegExp

- Type: `string` (**This is a regular string.**)
- Default: `#+\\s+(.*)\\n+(\\|?.+\\|.+)\\n\\|?\\s*:?-+:?\\s*\\|.+((\\n\\|?.+\\|.+)+)`

matches the title and table header and table content information from docs

### fileNameRegExp

- Type: `string` (**This is a regular string.**)
- Default: `\\/((\\w|-)+)\\.\\w+$`

matches the file name from path

## Advancement

### about titleRegExp

matches the first format information in the docs

#+\\\\s+(`.*`)\\\\n+(`[^(#|\\n)]*`)

<div>
# <code>title</code>
<div><code>description</code></div>
</div>

and

<div>
## <code>title</code>
</div>

matches other formats, For example:

#+\\\\s+(`.*`)\\n+>\\\\s\*(`[^(#|\\n)]*`)

<div>
# <code>title</code>
<div>> <code>description</code></div>
</div>

### about tableRegExp

matches the format information in the docs

#+\\\\s+(`.*`)\\\\n+(`\\|?.+\\|.+`)\\\\n\\\\|?\\\\s*:?-+:?\\\\s\*\\\\|.+(`(\\n\\|?.+\\|.+)+`)

<div>
### <code>title</code>
<div><code>| header |</code></div>
<div>| ------ |</div>
<div><code>| column |</code></div>
<div><code>| column |</code></div>
</div>

and

<div>
### <code>sub-component title</code>
<div><code>| header |</code></div>
<div>| :----- |</div>
<div><code>| column |</code></div>
<div><code>| column |</code></div>
</div>

by default matches all table, Optimize it through tableRegExp, For example:

#+\\\\s+(`.*\\s*Props|.*\\s*Events|.*\\s*Slots|.*\\s*Directives`)\\\\s*\\\\n+(`\\|?.+\\|.+`)\\\\n\\\\|?\\\\s*:?-+:?\\\\s*\\\\|.+(`(\\n\\|?.+\\|.+)+`)

<div>
### <code>Props | Events | Slots | Directives</code>
<div><code>| header |</code></div>
<div>| ------ |</div>
<div><code>| column |</code></div>
<div><code>| column |</code></div>
</div>

and

<div>
### <code>sub-component Props</code>
<div><code>| header |</code></div>
<div>| ------ |</div>
<div><code>| column |</code></div>
<div><code>| column |</code></div>
</div>

### other

- When this docs not included the primary title or `Props` `Events` `Slots` and `Directives`, this component are not created.

## License

[MIT](http://opensource.org/licenses/MIT)
