import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-menu-panel',
  styleUrl: 'brx-menu-panel.scss',
  shadow: false,
})
export class BrxMenuPanel {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
