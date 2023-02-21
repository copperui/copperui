import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-header-sign-in',
  styleUrl: 'brx-header-sign-in.scss',
  shadow: false,
})
export class BrxHeaderSignIn {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
