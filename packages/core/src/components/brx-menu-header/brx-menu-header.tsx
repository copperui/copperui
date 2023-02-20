import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-menu-header',
  styleUrl: 'brx-menu-header.scss',
  shadow: false,
})
export class BrxMenuHeader {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
