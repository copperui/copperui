import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-table-actions-trigger',
  styleUrl: 'brx-table-actions-trigger.scss',
  shadow: false,
})
export class BrxTableActionsTrigger {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
