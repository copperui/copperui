import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brx-card-content',
  styleUrl: 'brx-card-content.scss',
  shadow: false,
})
export class BrxCardContent {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
