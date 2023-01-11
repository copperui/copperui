# brx-message



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type                                           | Default     |
| -------------- | --------------- | ----------- | ---------------------------------------------- | ----------- |
| `dismissable`  | `dismissable`   |             | `boolean`                                      | `undefined` |
| `messageTitle` | `message-title` |             | `string`                                       | `undefined` |
| `severity`     | `severity`      |             | `"danger" \| "info" \| "success" \| "warning"` | `'info'`    |
| `variant`      | `variant`       |             | `"feedback" \| "message"`                      | `'message'` |


## Methods

### `dismiss() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [brx-icon](../brx-icon)
- [brx-button](../brx-button)

### Graph
```mermaid
graph TD;
  brx-message --> brx-icon
  brx-message --> brx-button
  brx-button --> brx-loading
  style brx-message fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
