import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-header-top',
  styleUrl: 'brx-header-top.scss',
  shadow: false,
})
export class BrxHeaderTop {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
