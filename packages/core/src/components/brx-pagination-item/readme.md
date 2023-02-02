# brx-pagination-item



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                                              | Default     |
| ---------- | ---------- | ----------- | ------------------------------------------------- | ----------- |
| `_target`  | `target`   |             | `"first" \| "last" \| "next" \| "prev" \| number` | `undefined` |
| `active`   | `active`   |             | `boolean`                                         | `undefined` |
| `disabled` | `disabled` |             | `boolean`                                         | `undefined` |


## Methods

### `getTarget() => Promise<number | "first" | "prev" | "next" | "last">`



#### Returns

Type: `Promise<number | "first" | "prev" | "next" | "last">`




## Dependencies

### Depends on

- [brx-button](../brx-button)
- [brx-icon](../brx-icon)

### Graph
```mermaid
graph TD;
  brx-pagination-item --> brx-button
  brx-pagination-item --> brx-icon
  brx-button --> brx-loading
  style brx-pagination-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
