# brx-breadcrumb



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type     | Default     |
| ------------ | ------------- | ----------- | -------- | ----------- |
| `dropdownId` | `dropdown-id` |             | `string` | `undefined` |


## Dependencies

### Depends on

- [brx-breadcrumb-list](../brx-breadcrumb-list)
- [brx-breadcrumb-item](../brx-breadcrumb-item)
- [brx-dropdown-trigger](../brx-dropdown-trigger)
- [brx-button](../brx-button)
- [brx-icon](../brx-icon)
- [brx-breadcrumb-card](../brx-breadcrumb-card)

### Graph
```mermaid
graph TD;
  brx-breadcrumb --> brx-breadcrumb-list
  brx-breadcrumb --> brx-breadcrumb-item
  brx-breadcrumb --> brx-dropdown-trigger
  brx-breadcrumb --> brx-button
  brx-breadcrumb --> brx-icon
  brx-breadcrumb --> brx-breadcrumb-card
  brx-breadcrumb-item --> brx-icon
  brx-dropdown-trigger --> brx-collapse-trigger
  brx-button --> brx-loading
  brx-breadcrumb-card --> brx-card
  brx-breadcrumb-card --> brx-item
  style brx-breadcrumb fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
