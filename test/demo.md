# Demo

This is a description of the Demo component

<!-- The first content similar to the above structure will be the name and description information of the current component -->

<!-- Regardless of the order of the following content and the internal content of the table -->

## Props

| Name | Description | Type | Options | Default |
|----- |------------ |----- |-------- | ------- |
| v-model | bind value | string | top / bottom ||

<!-- The header of the table can be configured -->
<!-- 
  The type support TypeScript writing, but in order to generate better code hints, there are some requirements for reference types

  recommend: `VNode[]`, `VNode[] \| Array<string>`
  not recommend: `Array<VNode>`, `Array<VNode \| string>`
 -->

## Events

| Name | Description |
|----- | ----------- |
| change | triggers when fixed state changed |

## Slots

| Name | Description | Subtags |
| ---- | ----------- | ------- |
| default | customize button group content | DemoItem / DemoGroup |
| other | some other slots ||

## Directives

| Name | Description | Type |
| ---- | ----------- | ---- |
| v-loading | show animation while loading data | boolean |
