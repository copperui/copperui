import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-header-search',
  styleUrl: 'brx-header-search.scss',
  shadow: false,
})
export class BrxHeaderSearch {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
