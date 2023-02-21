import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-header-bottom',
  styleUrl: 'brx-header-bottom.scss',
  shadow: false,
})
export class BrxHeaderBottom {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
