# brx-select



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                                     | Type       | Default                |
| ------------------ | -------------------- | --------------------------------------------------------------- | ---------- | ---------------------- |
| `controlledValue`  | --                   |                                                                 | `string[]` | `TOKEN_UNCONTROLLED`   |
| `darkMode`         | `dark-mode`          |                                                                 | `boolean`  | `false`                |
| `disableToggleAll` | `disable-toggle-all` |                                                                 | `boolean`  | `false`                |
| `inputId`          | `input-id`           |                                                                 | `string`   | `undefined`            |
| `label`            | `label`              |                                                                 | `string`   | `undefined`            |
| `multiple`         | `multiple`           |                                                                 | `boolean`  | `false`                |
| `name`             | `name`               | The name of the control, which is submitted with the form data. | `string`   | `undefined`            |
| `nativeSelect`     | `native-select`      |                                                                 | `boolean`  | `null`                 |
| `selectAllLabel`   | `select-all-label`   |                                                                 | `string`   | `'Selecionar Todos'`   |
| `unselectAllLabel` | `unselect-all-label` |                                                                 | `string`   | `'Deselecionar Todos'` |
| `value`            | --                   |                                                                 | `string[]` | `[]`                   |


## Events

| Event                  | Description | Type                                              |
| ---------------------- | ----------- | ------------------------------------------------- |
| `brxChange`            |             | `CustomEvent<SelectChangeEventDetail<string>>`    |
| `brxFilterInputChange` |             | `CustomEvent<SelectFilterInputChangeEventDetail>` |


## Dependencies

### Depends on

- [brx-input](../brx-input)
- [brx-select-toggle](../brx-select-toggle)
- [brx-select-option](../brx-select-option)

### Graph
```mermaid
graph TD;
  brx-select --> brx-input
  brx-select --> brx-select-toggle
  brx-select --> brx-select-option
  brx-input --> brx-icon
  brx-input --> brx-button
  brx-button --> brx-loading
  brx-select-toggle --> brx-button
  brx-select-toggle --> brx-icon
  brx-select-option --> brx-item
  brx-select-option --> brx-checkbox
  brx-select-option --> brx-radio
  style brx-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
