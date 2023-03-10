# brx-collapse-trigger

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute      | Description | Type                    | Default                  |
| ------------ | -------------- | ----------- | ----------------------- | ------------------------ |
| `breakpoint` | `breakpoint`   |             | `string`                | `undefined`              |
| `iconToHide` | `icon-to-hide` |             | `string`                | `'fa5/fas/chevron-up'`   |
| `iconToShow` | `icon-to-show` |             | `string`                | `'fa5/fas/chevron-down'` |
| `target`     | `target`       |             | `HTMLElement \| string` | `undefined`              |
| `useIcons`   | `use-icons`    |             | `boolean`               | `true`                   |


## Events

| Event                          | Description | Type                |
| ------------------------------ | ----------- | ------------------- |
| `brxSetTargetVisibilityStatus` |             | `CustomEvent<void>` |
| `brxTriggerClick`              |             | `CustomEvent<void>` |


## Methods

### `close(emitEvent?: boolean) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getIsOpen() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `getTarget() => Promise<HTMLElement>`



#### Returns

Type: `Promise<HTMLElement>`



### `getTrigger() => Promise<HTMLElement>`



#### Returns

Type: `Promise<HTMLElement>`



### `open(emitEvent?: boolean) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [brx-accordion-trigger](../brx-accordion-trigger)
 - [brx-dropdown-trigger](../brx-dropdown-trigger)

### Graph
```mermaid
graph TD;
  brx-accordion-trigger --> brx-collapse-trigger
  brx-dropdown-trigger --> brx-collapse-trigger
  style brx-collapse-trigger fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
