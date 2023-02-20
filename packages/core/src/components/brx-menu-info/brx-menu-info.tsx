import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-menu-info',
  styleUrl: 'brx-menu-info.scss',
  shadow: false,
})
export class BrxMenuInfo {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
