# brx-tooltip-auto



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type                                     | Default     |
| ------------- | -------------- | ----------- | ---------------------------------------- | ----------- |
| `place`       | `place`        |             | `"bottom" \| "left" \| "right" \| "top"` | `'bottom'`  |
| `tooltipText` | `tooltip-text` |             | `string`                                 | `undefined` |


## Dependencies

### Used by

 - [brx-step-progress-btn](../brx-step-progress-btn)
 - [brx-tab](../brx-tab)

### Depends on

- [brx-tooltip](../brx-tooltip)
- [brx-tooltip-content](../brx-tooltip-content)

### Graph
```mermaid
graph TD;
  brx-tooltip-auto --> brx-tooltip
  brx-tooltip-auto --> brx-tooltip-content
  brx-tooltip --> brx-tooltip-content
  brx-tooltip-content --> brx-icon
  brx-step-progress-btn --> brx-tooltip-auto
  brx-tab --> brx-tooltip-auto
  style brx-tooltip-auto fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
