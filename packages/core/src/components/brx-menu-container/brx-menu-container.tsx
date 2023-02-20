import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-menu-container',
  styleUrl: 'brx-menu-container.scss',
  shadow: false,
})
export class BrxMenuContainer {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
