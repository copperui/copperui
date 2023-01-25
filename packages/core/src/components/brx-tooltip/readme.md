# brx-tooltip

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                                     | Default     |
| --------- | --------- | ----------- | ---------------------------------------- | ----------- |
| `active`  | `active`  |             | `boolean`                                | `false`     |
| `color`   | `color`   |             | `string`                                 | `'info'`    |
| `place`   | `place`   |             | `"bottom" \| "left" \| "right" \| "top"` | `'top'`     |
| `popover` | `popover` |             | `boolean`                                | `false`     |
| `target`  | `target`  |             | `HTMLElement \| string`                  | `undefined` |
| `text`    | `text`    |             | `string`                                 | `undefined` |
| `timer`   | `timer`   |             | `number`                                 | `undefined` |
| `type`    | `type`    |             | `string`                                 | `'info'`    |


## Methods

### `hide() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [brx-tooltip-auto](../brx-tooltip-auto)

### Depends on

- [brx-tooltip-content](../brx-tooltip-content)

### Graph
```mermaid
graph TD;
  brx-tooltip --> brx-tooltip-content
  brx-tooltip-content --> brx-icon
  brx-tooltip-auto --> brx-tooltip
  style brx-tooltip fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
