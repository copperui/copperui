import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brx-pagination-ellipsis',
  styleUrl: 'brx-pagination-ellipsis.scss',
  shadow: false,
})
export class BrxPaginationEllipsis {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
