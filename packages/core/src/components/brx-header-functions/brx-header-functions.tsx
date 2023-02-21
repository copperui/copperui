import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-header-functions',
  styleUrl: 'brx-header-functions.scss',
  shadow: false,
})
export class BrxHeaderFunctions {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
