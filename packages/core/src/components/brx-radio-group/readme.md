# brx-radio-group

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                                     | Type                         | Default              |
| --------------------- | ----------------------- | --------------------------------------------------------------- | ---------------------------- | -------------------- |
| `allowEmptySelection` | `allow-empty-selection` | If `true`, the radios can be deselected.                        | `boolean`                    | `false`              |
| `controlledValue`     | `controlled-value`      |                                                                 | `any`                        | `TOKEN_UNCONTROLLED` |
| `label`               | `label`                 |                                                                 | `HTMLLabelElement \| string` | `undefined`          |
| `labelId`             | `label-id`              |                                                                 | `string`                     | `undefined`          |
| `name`                | `name`                  | The name of the control, which is submitted with the form data. | `string`                     | `undefined`          |
| `value`               | `value`                 |                                                                 | `any`                        | `undefined`          |


## Events

| Event                 | Description | Type                                       |
| --------------------- | ----------- | ------------------------------------------ |
| `brxRadioGroupChange` |             | `CustomEvent<RadioGroupChangeEventDetail>` |
| `brxRadioGroupUpdate` |             | `CustomEvent<RadioGroupUpdateEventDetail>` |


## Methods

### `getCurrentValue() => Promise<any>`



#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
