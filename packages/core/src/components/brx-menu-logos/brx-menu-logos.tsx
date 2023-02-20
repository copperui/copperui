import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-menu-logos',
  styleUrl: 'brx-menu-logos.scss',
  shadow: false,
})
export class BrxMenuLogos {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
