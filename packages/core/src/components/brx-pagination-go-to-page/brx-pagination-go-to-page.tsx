import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brx-pagination-go-to-page',
  styleUrl: 'brx-pagination-go-to-page.scss',
  shadow: false,
})
export class BrxPaginationGoToPage {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
