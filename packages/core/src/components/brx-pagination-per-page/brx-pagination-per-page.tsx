import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brx-pagination-per-page',
  styleUrl: 'brx-pagination-per-page.scss',
  shadow: false,
})
export class BrxPaginationPerPage {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
