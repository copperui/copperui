import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-header-menu',
  styleUrl: 'brx-header-menu.scss',
  shadow: false,
})
export class BrxHeaderMenu {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
