# brx-checkbox



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                                                                                                                                                                                                                                                  | Type                    | Default     |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | ----------- |
| `checked`       | `checked`       | If `true`, the checkbox is selected.                                                                                                                                                                                                                         | `boolean`               | `false`     |
| `darkMode`      | `dark-mode`     |                                                                                                                                                                                                                                                              | `boolean`               | `false`     |
| `disabled`      | `disabled`      | If `true`, the user cannot interact with the checkbox.                                                                                                                                                                                                       | `boolean`               | `false`     |
| `hiddenLabel`   | `hidden-label`  |                                                                                                                                                                                                                                                              | `boolean`               | `false`     |
| `indeterminate` | `indeterminate` | If `true`, the checkbox will visually appear as indeterminate.                                                                                                                                                                                               | `boolean`               | `false`     |
| `inputId`       | `input-id`      |                                                                                                                                                                                                                                                              | `string`                | `undefined` |
| `invalid`       | `invalid`       |                                                                                                                                                                                                                                                              | `boolean`               | `undefined` |
| `label`         | `label`         |                                                                                                                                                                                                                                                              | `string`                | `undefined` |
| `name`          | `name`          | The name of the control, which is submitted with the form data.                                                                                                                                                                                              | `string`                | `undefined` |
| `size`          | `size`          |                                                                                                                                                                                                                                                              | `"medium" \| "small"`   | `'medium'`  |
| `state`         | `state`         |                                                                                                                                                                                                                                                              | `"danger" \| "invalid"` | `undefined` |
| `valid`         | `valid`         |                                                                                                                                                                                                                                                              | `boolean`               | `undefined` |
| `value`         | `value`         | The value of the checkbox does not mean if it's checked or not, use the `checked` property for that.  The value of a checkbox is analogous to the value of an `<input type="checkbox">`, it's only used when the checkbox participates in a native `<form>`. | `any`                   | `'on'`      |


## Events

| Event       | Description                                    | Type                                          |
| ----------- | ---------------------------------------------- | --------------------------------------------- |
| `brxBlur`   | Emitted when the checkbox loses focus.         | `CustomEvent<void>`                           |
| `brxChange` | Emitted when the checked property has changed. | `CustomEvent<CheckboxChangeEventDetail<any>>` |
| `brxFocus`  | Emitted when the checkbox has focus.           | `CustomEvent<void>`                           |


## Methods

### `getNativeChecked() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
