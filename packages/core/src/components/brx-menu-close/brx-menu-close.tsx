import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-menu-close',
  styleUrl: 'brx-menu-close.scss',
  shadow: false,
})
export class BrxMenuClose {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
