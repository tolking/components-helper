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
const { main } = require('components-helper')

main({
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
- [reWebTypesType](#rewebtypestype)
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
- [slotsType](#slotsType)
- [slotsSubtags](#slotssubtags)
- [directives](#directives)
- [directivesName](#directivesname)
- [directivesDescription](#directivesdescription)
- [directivesType](#directivestype)
- [titleRegExp](#titleregexp)
- [tableRegExp](#tableregexp)
- [fileNameRegExp](#filenameregexp)

</details>

### entry

- Required: `true`
- Type: `string` | `string[]`

Specify the entry directory. refer: [fast-glob](https://github.com/mrmlnc/fast-glob#pattern-syntax)

for example:
  - `docs/*.md` -- matches all files in the docs
  - `docs/(a|b).md` -- matches files `a.md` and `b.md`
  - `docs/!(a|b).md` -- matches files except for `a.md` and `b.md`

### fastGlobConfig

- Type: `object`

The config of [fast-glob](https://github.com/mrmlnc/fast-glob#options-3)

### outDir

- Required: `true`
- Type: `string`

Specify the output directory. For example, `lib``

### name

- Required: `true`
- Type: `string`

name of the component library. 

### version

- Required: `true`
- Type: `string`

the version of the component library. 

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

for example `(title) => 'prefix-' + title.replace(/\B([A-Z])/g, '-$1').toLowerCase()`

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

- Type: `(title: string, fileName: string, path: string) => Source`

rewriting the source of web-types. (the name of export from the component library)

### reWebTypesType

- Type: `(type: string) => undefined | string | BaseContribution`

Only some common types are processed internally, and the rest are exported from the component library by default. If your document also references types in third-party libraries, you can choose to override the relevant behavior through this function

### tags

- Type: `string`
- Default: `tags.json`

name for tags of the vetur

### attributes

- Type: `string`
- Default: `attributes.json`

name for attributes of the Vetur

### webTypes

- Type: `string`
- Default: `web-types.json`

name for web-types of the WebStorm

### props

- Type: `string` (**This is a regular string and ignores case.**)
- Default: `props`

The title of the props table. **other string in the header will be identified as sub-component**

### propsName

- Type: `string`
- Default: `Name`

The header name of the `Name` in the props table

### propsDescription

- Type: `string`
- Default: `Description`

The header name of the `Description` in the props table

### propsType

- Type: `string`
- Default: `Type`

The header name of the `Type` in the props table

### propsOptions

- Type: `string`
- Default: `Options`

The header name of the `Options` in the props table

### propsDefault

- Type: `string`
- Default: `Default`

The header name of the `Default` in the props table

### events

- Type: `string` (**This is a regular string and ignores case.**)
- Default: `events`

The title of the events table. **other string in the header will be identified as sub-component**

### eventsName

- Type: `string`
- Default: `Name`

The header name of the `Name` in the events table

### eventsDescription

- Type: `string`
- Default: `Description`

The header name of the `Description` in the events table

### slots

- Type: `string` (**This is a regular string and ignores case.**)
- Default: `slots`

The title of the slots table. **other string in the header will be identified as sub-component**

### slotsName

- Type: `string`
- Default: `Name`

The header name of the `Name` in the slots table

### slotsDescription

- Type: `string`
- Default: `Description`

The header name of the `Description` in the slots table

### slotsType

- Type: `string`
- Default: `Type`

The header name of the `Type` in the slots table

### slotsSubtags

- Type: `string`
- Default: `Subtags`

The header name of the `Subtags` in the slots table

### directives

- Type: `string` (**This is a regular string and ignores case.**)
- Default: `directives`

The title of the directives table. **other string in the header will be identified as sub-component**

### directivesName

- Type: `string`
- Default: `Name`

The header name of the `Name` in the directives table

### directivesDescription

- Type: `string`
- Default: `Description`

The header name of the `Description` in the directives table

### directivesType

- Type: `string`
- Default: `Type`

The header name of the `Type` in the directives table

### titleRegExp

- Type: `RegExp` | `string` (**This is a regular string.**)
- Default: `/#+\s+(.*)\n+([^(#|\n)]*)/g`

matches the title and description information from docs

### tableRegExp

- Type: `RegExp` | `string` (**This is a regular string.**)
- Default: `/#+\s+(.*)\n+(\|?.+\|.+)\n\|?\s*:?-+:?\s*\|.+((\n\|?.+\|.+)+)/g`

matches the title and table header and the table contains information from docs

### fileNameRegExp

- Type: `RegExp` | `string` (**This is a regular string.**)
- Default: `/\/((\w|-)+)\.\w+$/`

matches the file name from the path

## Advancement

### about titleRegExp

matches the first format information in the docs

/#+\s+(`.*`)\n+(`[^(#|\n)]*`)/

<div>
# <code>title</code>
<div><code>description</code></div>
</div>

and

<div>
## <code>title</code>
</div>

matches other formats, For example:

/#+\s+(`.*`)\n+>\s*(`[^(#|\n)]*`)/g

<div>
# <code>title</code>
<div>> <code>description</code></div>
</div>

### about tableRegExp

matches the format information in the docs

/#+\s+(`.*`)\n+(`\|?.+\|.+`)\n\|?\s*:?-+:?\s*\|.+(`(\n\|?.+\|.+)+`)/g

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

by default matches all tables, Optimize it through tableRegExp, For example:

/#+\s+(`.*\s*Props|.*\s*Events|.*\s*Slots|.*\s*Directives`)\n+(`\|?.+\|.+`)\n\|?\s*:?-+:?\s*\|.+(`(\n\|?.+\|.+)+`)/g

<div>
### <code>Props / Events / Slots / Directives</code>
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

When this document does not include the primary title or `Props` `Events` `Slots` and `Directives`, this component is not created.

## License

[MIT](http://opensource.org/licenses/MIT)
