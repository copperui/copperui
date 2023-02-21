import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-table-header',
  styleUrl: 'brx-table-header.scss',
  shadow: false,
})
export class BrxTableHeader {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
