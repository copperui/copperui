import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-table-title',
  styleUrl: 'brx-table-title.scss',
  shadow: false,
})
export class BrxTableTitle {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
