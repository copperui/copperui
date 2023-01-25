# brx-step-progress-btn



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type                                           | Default     |
| ------------- | -------------- | ----------- | ---------------------------------------------- | ----------- |
| `active`      | `active`       |             | `boolean`                                      | `undefined` |
| `alert`       | `alert`        |             | `"danger" \| "info" \| "success" \| "warning"` | `undefined` |
| `disabled`    | `disabled`     |             | `boolean`                                      | `undefined` |
| `stepNum`     | `step-num`     |             | `string`                                       | `undefined` |
| `tooltipText` | `tooltip-text` |             | `string`                                       | `undefined` |


## Dependencies

### Depends on

- [brx-tooltip-auto](../brx-tooltip-auto)

### Graph
```mermaid
graph TD;
  brx-step-progress-btn --> brx-tooltip-auto
  brx-tooltip-auto --> brx-tooltip
  brx-tooltip-auto --> brx-tooltip-content
  brx-tooltip --> brx-tooltip-content
  brx-tooltip-content --> brx-icon
  style brx-step-progress-btn fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
