import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-menu-footer',
  styleUrl: 'brx-menu-footer.scss',
  shadow: false,
})
export class BrxMenuFooter {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
