import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-table-selected-bar',
  styleUrl: 'brx-table-selected-bar.scss',
  shadow: false,
})
export class BrxTableSelectedBar {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
