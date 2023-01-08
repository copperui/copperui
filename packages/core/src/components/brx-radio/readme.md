# brx-radio



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                     | Type      | Default     |
| ---------- | ---------- | --------------------------------------------------------------- | --------- | ----------- |
| `checked`  | `checked`  | If `true`, the radio is selected.                               | `boolean` | `false`     |
| `disabled` | `disabled` | If `true`, the user cannot interact with the radio.             | `boolean` | `false`     |
| `inputId`  | `input-id` |                                                                 | `string`  | `undefined` |
| `label`    | `label`    |                                                                 | `string`  | `undefined` |
| `name`     | `name`     | The name of the control, which is submitted with the form data. | `string`  | `undefined` |
| `value`    | `value`    | the value of the radio.                                         | `any`     | `undefined` |


## Events

| Event       | Description                                | Type                                       |
| ----------- | ------------------------------------------ | ------------------------------------------ |
| `brxBlur`   | Emitted when the radio button loses focus. | `CustomEvent<void>`                        |
| `brxChange` |                                            | `CustomEvent<RadioChangeEventDetail<any>>` |
| `brxFocus`  | Emitted when the radio button has focus.   | `CustomEvent<void>`                        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
