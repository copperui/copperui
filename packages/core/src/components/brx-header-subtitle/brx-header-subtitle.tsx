import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-header-subtitle',
  styleUrl: 'brx-header-subtitle.scss',
  shadow: false,
})
export class BrxHeaderSubtitle {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
