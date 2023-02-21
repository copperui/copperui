import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-header-info',
  styleUrl: 'brx-header-info.scss',
  shadow: false,
})
export class BrxHeaderInfo {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
