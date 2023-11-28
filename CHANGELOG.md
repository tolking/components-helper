# Changelog

### 2.2.0

berak change

- change the type to module (#45)

``` diff
- index.js
+ index.cjs
- index.es.js
+ index.js
```

### 2.1.5

fix

- optimize file writing (#42)
- incompatible with pure number types (#43)

### 2.1.4

feat

- add fastGlobConfig for fast-glob (#39)

fix

- the attribute-value should change with type (#38)

### 2.1.3

feat

- compatible with more types
- move events to js/events
- add config slotsType (#36)

### 2.1.2

feat

- support filter options from type ([view instructions for use](./test/mult.md))
- export utils functions

fix

- miss type boolean
- partial separator not replaced

### 2.1.1

feat

- add config reWebTypesType
- improve types for web-types

### 2.1.0

feat

- update web-types to 2.0
- add attribute enum autosuggestion for web-types

### 2.0.0

feat

- export all function
- use matchAll replace match
- add RegExp for `titleRegExp` `tableRegExp` and `fileNameRegExp`

#### migration guide

``` diff
- const helper = require('../lib/index')
+ const helper = require('../lib/index').default
# or
- const helper = require('../lib/index')
+ const { main } = require('../lib/index')
```

It is recommended to replace regular strings with RegExp

``` diff
{
-  titleRegExp: '#+\\s+(.*)\\n+([^(#|\\n)]*)',
+  titleRegExp: /#+\s+(.*)\n+([^(#|\n)]*)/g,

-  titleRegExp: '#+\\s+(.*)\\n+>\\s*([^(#|\\n)]*)',
+  titleRegExp: /#+\s+(.*)\n+>\s*([^(#|\n)]*)/g,

-  tableRegExp: '#+\\s+(.*)\\n+(\\|?.+\\|.+)\\n\\|?\\s*:?-+:?\\s*\\|.+((\\n\\|?.+\\|.+)+)',
+  tableRegExp: /#+\s+(.*)\n+(\|?.+\|.+)\n\|?\s*:?-+:?\s*\|.+((\n\|?.+\|.+)+)/g,

-  tableRegExp: '#+\\s+(.*\\s*Props|.*\\s*Events|.*\\s*Slots|.*\\s*Directives)\\s*\\n+(\\|?.+\\|.+)\\n\\|?\\s*:?-+:?\\s*\\|.+((\\n\\|?.+\\|.+)+)',
+  tableRegExp: /#+\s+(.*\s*Props|.*\s*Events|.*\s*Slots|.*\s*Directives)\n+(\|?.+\|.+)\n\|?\s*:?-+:?\s*\|.+((\n\|?.+\|.+)+)/g,

-  fileNameRegExp: '\\/((\\w|-)+)\\.\\w+$',
+  fileNameRegExp: /\/((\w|-)+)\.\w+$/,
}
```

### 1.0.5

feat

- export all types

fix

- support windows path

### 1.0.4

feat

- add `reWebTypesSource` config

fix

- the header error of description in tags

### 1.0.3

feat

- add `reVeturDescription` config
- add arg for reDocUrl (path: string)
- resolve `Subtags` in header of tabel
- parsing subtitles

### 1.0.2

feat

- add `space` config
- remove '[]'

fix

- split error when '\w|'
- split error when '\|'

### 1.0.1

feat

- add arg for reAttribute (row: string[], title: string)

fix

- not support '\|' in table
- not support ||| in table
