import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-menu-title',
  styleUrl: 'brx-menu-title.scss',
  shadow: false,
})
export class BrxMenuTitle {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
