# First

This is a description of the First component

## Second

This is a description of the Second component

## Third

This is a description of the Third component

<!-- A document can contain multiple components, regardless of the order of all -->

<!-- Each component must specify the corresponding table, otherwise it will be ignored -->

## First Props

| Name | Description | Type | Default |
|------|-------------|------|---------|
| size | size of component | 'default' / 'small' / 'large' | default |
| type | type of component | 'primary' \| 'success' \| 'warning' \| 'danger' ||

<!--
 Supports the use of separator `/` to split the type, and is compatible with the `\|` split type
 
 To generate better type hints, the `\|` cannot be used with reference types, eg `CommonType \| 'primary' \| 'success'`
 -->

## First Slots

| Name | Description | Subtags |
| ---- | ----------- | ------- |
| default | customize button group content | Second / Third |

## Second Props

| Name | Description | Type       | Default |
|------|------------ |------------| ------- |
| size | size of component | CommonType ||

<!--
 Make sure the component library exports the type `CommonType`
 eg `export type CommonType = 'default' | 'small' | 'large'`

 This way of writing is only valid for the web-types
 -->

## Third Events

| Name | Description |
|----- | ----------- |
| change | triggers when fixed state changed |
