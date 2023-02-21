import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-header-sign',
  styleUrl: 'brx-header-sign.scss',
  shadow: false,
})
export class BrxHeaderSign {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
