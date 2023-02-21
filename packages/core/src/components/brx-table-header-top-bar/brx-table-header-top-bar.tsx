import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-table-header-top-bar',
  styleUrl: 'brx-table-header-top-bar.scss',
  shadow: false,
})
export class BrxTableHeaderTopBar {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
