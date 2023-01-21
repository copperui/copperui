# brx-tab-tooltip



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type     | Default     |
| ------------- | -------------- | ----------- | -------- | ----------- |
| `tooltipText` | `tooltip-text` |             | `string` | `undefined` |


## Dependencies

### Used by

 - [brx-tab](.)

### Depends on

- [brx-tooltip](../brx-tooltip)
- [brx-tooltip-content](../brx-tooltip-content)

### Graph
```mermaid
graph TD;
  brx-tab-tooltip --> brx-tooltip
  brx-tab-tooltip --> brx-tooltip-content
  brx-tooltip --> brx-tooltip-content
  brx-tooltip-content --> brx-icon
  brx-tab --> brx-tab-tooltip
  style brx-tab-tooltip fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
