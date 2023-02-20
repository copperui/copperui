import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-menu-scrim',
  styleUrl: 'brx-menu-scrim.scss',
  shadow: false,
})
export class BrxMenuScrim {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
