import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-table-search-trigger',
  styleUrl: 'brx-table-search-trigger.scss',
  shadow: false,
})
export class BrxTableSearchTrigger {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
