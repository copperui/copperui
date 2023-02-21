import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-table-search-bar',
  styleUrl: 'brx-table-search-bar.scss',
  shadow: false,
})
export class BrxTableSearchBar {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
