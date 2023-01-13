import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brx-card-header',
  styleUrl: 'brx-card-header.scss',
  shadow: false,
})
export class BrxCardHeader {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
