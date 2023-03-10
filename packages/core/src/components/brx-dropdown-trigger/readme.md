# brx-dropdown-trigger

<!-- Auto Generated Below -->


## Properties

| Property                      | Attribute                         | Description | Type                    | Default                  |
| ----------------------------- | --------------------------------- | ----------- | ----------------------- | ------------------------ |
| `breakpoint`                  | `breakpoint`                      |             | `string`                | `undefined`              |
| `iconToHide`                  | `icon-to-hide`                    |             | `string`                | `'fa5/fas/chevron-up'`   |
| `iconToShow`                  | `icon-to-show`                    |             | `string`                | `'fa5/fas/chevron-down'` |
| `keepTargetVisibleWhenHidden` | `keep-target-visible-when-hidden` |             | `boolean`               | `false`                  |
| `target`                      | `target`                          |             | `HTMLElement \| string` | `undefined`              |
| `useIcons`                    | `use-icons`                       |             | `boolean`               | `true`                   |


## Dependencies

### Used by

 - [brx-breadcrumb](../brx-breadcrumb)
 - [brx-pagination-ellipsis](../brx-pagination-ellipsis)

### Depends on

- [brx-collapse-trigger](../brx-collapse-trigger)

### Graph
```mermaid
graph TD;
  brx-dropdown-trigger --> brx-collapse-trigger
  brx-breadcrumb --> brx-dropdown-trigger
  brx-pagination-ellipsis --> brx-dropdown-trigger
  style brx-dropdown-trigger fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
