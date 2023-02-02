import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brx-pagination-information',
  styleUrl: 'brx-pagination-information.scss',
  shadow: false,
})
export class BrxPaginationInformation {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
