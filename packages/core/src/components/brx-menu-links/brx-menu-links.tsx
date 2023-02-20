import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-menu-links',
  styleUrl: 'brx-menu-links.scss',
  shadow: false,
})
export class BrxMenuLinks {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
