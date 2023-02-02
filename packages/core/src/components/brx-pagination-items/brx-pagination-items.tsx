import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brx-pagination-items',
  styleUrl: 'brx-pagination-items.scss',
  shadow: false,
})
export class BrxPaginationItems {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
