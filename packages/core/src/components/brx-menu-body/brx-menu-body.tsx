import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-menu-body',
  styleUrl: 'brx-menu-body.scss',
  shadow: false,
})
export class BrxMenuBody {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
