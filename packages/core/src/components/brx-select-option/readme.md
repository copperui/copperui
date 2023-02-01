# brx-select-option



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type      | Default     |
| ---------- | ---------- | ----------- | --------- | ----------- |
| `checked`  | `checked`  |             | `boolean` | `false`     |
| `inputId`  | `input-id` |             | `string`  | `undefined` |
| `label`    | `label`    |             | `string`  | `undefined` |
| `multiple` | `multiple` |             | `boolean` | `false`     |
| `value`    | `value`    |             | `string`  | `undefined` |
| `visible`  | `visible`  |             | `boolean` | `true`      |


## Events

| Event                   | Description | Type                                         |
| ----------------------- | ----------- | -------------------------------------------- |
| `brxSelectOptionChange` |             | `CustomEvent<SelectOptionChangeEventDetail>` |


## Dependencies

### Used by

 - [brx-select](../brx-select)

### Depends on

- [brx-item](../brx-item)
- [brx-checkbox](../brx-checkbox)
- [brx-radio](../brx-radio)

### Graph
```mermaid
graph TD;
  brx-select-option --> brx-item
  brx-select-option --> brx-checkbox
  brx-select-option --> brx-radio
  brx-select --> brx-select-option
  style brx-select-option fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
