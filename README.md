# components-helper

> Based on the docs to provide code prompt files for vue component library

nodejs ^10

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

### entry (required)

- Type: `string`

entry path, refer: [fast-glob](https://github.com/mrmlnc/fast-glob#pattern-syntax)

For example:
  - `docs/*.md` -- matches all files in the docs
  - `docs/(a|b).md` -- matches files `a.md` and `b.md`
  - `docs/!(a|b).md` -- matches files except `a.md` and `b.md`

### outDir (required)

- Type: `string`

outDir path

For example: `lib`

### name

- Type: `string`

name of the component library

### version

- Type: `string`

version of the component library

### reComponentName

- Type: `(title: string, fileName: string, path: string) => string`

rewriting the name of the component

For example: `(title) => 'prefix-' + title.replace(/\B([A-Z])/g, '-$1').toLowerCase()`

### reDocUrl

- Type: `(fileName: string, header?: string) => string`

rewriting the doc url of the component

### reAttribute

- Type: `(value: string, key: string, columns: string[], title: string) => string | undefined`

rewriting the attribute of the component

### space

- Type: `number` | `string`

Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read

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

### separator

- Type: `string`
- Default: `/`

name for props options separator

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

### defaultValSeparators

- Type: `[string, string]`
- Default: `[', ', '.']`

config the punctuation of description for vetur

### subtagsMap

- Type: `Record<string, string[]>`

config the subtags for vetur

For example: `{ 'app-button-group': ['app-button'] }`

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
