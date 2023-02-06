# brx-textarea



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                                                                                                                                               | Type                                                                                  | Default              |
| ----------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------- |
| `autocapitalize`  | `autocapitalize`   | Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user. Available optbrxs: `"off"`, `"none"`, `"on"`, `"sentences"`, `"words"`, `"characters"`. | `string`                                                                              | `'none'`             |
| `autofocus`       | `autofocus`        | This Boolean attribute lets you specify that a form control should have input focus when the page loads.                                                                                                  | `boolean`                                                                             | `false`              |
| `clearOnEdit`     | `clear-on-edit`    | If `true`, the value will be cleared after focus upon edit. Defaults to `true` when `type` is `"password"`, `false` for all other types.                                                                  | `boolean`                                                                             | `false`              |
| `color`           | `color`            |                                                                                                                                                                                                           | `"danger" \| "info" \| "success" \| "warning"`                                        | `undefined`          |
| `cols`            | `cols`             | The visible width of the text control, in average character widths. If it is specified, it must be a positive integer.                                                                                    | `number`                                                                              | `undefined`          |
| `controlledValue` | `controlled-value` |                                                                                                                                                                                                           | `string`                                                                              | `TOKEN_UNCONTROLLED` |
| `counter`         | `counter`          |                                                                                                                                                                                                           | `"limit" \| "total"`                                                                  | `undefined`          |
| `darkMode`        | `dark-mode`        |                                                                                                                                                                                                           | `boolean`                                                                             | `undefined`          |
| `disabled`        | `disabled`         | If `true`, the user cannot interact with the textarea.                                                                                                                                                    | `boolean`                                                                             | `false`              |
| `enterkeyhint`    | `enterkeyhint`     | A hint to the browser for which enter key to display. Possible values: `"enter"`, `"done"`, `"go"`, `"next"`, `"previous"`, `"search"`, and `"send"`.                                                     | `"done" \| "enter" \| "go" \| "next" \| "previous" \| "search" \| "send"`             | `undefined`          |
| `inline`          | `inline`           |                                                                                                                                                                                                           | `boolean`                                                                             | `undefined`          |
| `inputId`         | `input-id`         |                                                                                                                                                                                                           | `string`                                                                              | `undefined`          |
| `inputmode`       | `inputmode`        | A hint to the browser for which keyboard to display. Possible values: `"none"`, `"text"`, `"tel"`, `"url"`, `"email"`, `"numeric"`, `"decimal"`, and `"search"`.                                          | `"decimal" \| "email" \| "none" \| "numeric" \| "search" \| "tel" \| "text" \| "url"` | `undefined`          |
| `label`           | `label`            |                                                                                                                                                                                                           | `string`                                                                              | `undefined`          |
| `maxlength`       | `maxlength`        | If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.                          | `number`                                                                              | `undefined`          |
| `minlength`       | `minlength`        | If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.                          | `number`                                                                              | `undefined`          |
| `name`            | `name`             | The name of the control, which is submitted with the form data.                                                                                                                                           | `string`                                                                              | `undefined`          |
| `placeholder`     | `placeholder`      | Instructbrxal text that shows before the input has a value.                                                                                                                                               | `string`                                                                              | `undefined`          |
| `readonly`        | `readonly`         | If `true`, the user cannot modify the value.                                                                                                                                                              | `boolean`                                                                             | `false`              |
| `required`        | `required`         | If `true`, the user must fill in a value before submitting a form.                                                                                                                                        | `boolean`                                                                             | `false`              |
| `rows`            | `rows`             | The number of visible text lines for the control.                                                                                                                                                         | `number`                                                                              | `undefined`          |
| `spellcheck`      | `spellcheck`       | If `true`, the element will have its spelling and grammar checked.                                                                                                                                        | `boolean`                                                                             | `false`              |
| `value`           | `value`            |                                                                                                                                                                                                           | `string`                                                                              | `undefined`          |
| `wrap`            | `wrap`             | Indicates how the control wraps text.                                                                                                                                                                     | `"hard" \| "off" \| "soft"`                                                           | `undefined`          |


## Events

| Event       | Description                               | Type                                     |
| ----------- | ----------------------------------------- | ---------------------------------------- |
| `brxBlur`   | Emitted when the input loses focus.       | `CustomEvent<FocusEvent>`                |
| `brxChange` | Emitted when the input value has changed. | `CustomEvent<TextareaChangeEventDetail>` |
| `brxFocus`  | Emitted when the input has focus.         | `CustomEvent<FocusEvent>`                |
| `brxInput`  | Emitted when a keyboard input occurred.   | `CustomEvent<InputEvent>`                |


## Methods

### `getInputElement() => Promise<HTMLTextAreaElement>`

Returns the native `<textarea>` element used under the hood.

#### Returns

Type: `Promise<HTMLTextAreaElement>`



### `setFocus() => Promise<void>`

Sets focus on the native `textarea` in `brx-textarea`. Use this method instead of the global
`textarea.focus()`.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
