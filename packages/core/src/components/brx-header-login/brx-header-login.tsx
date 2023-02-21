import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-header-login',
  styleUrl: 'brx-header-login.scss',
  shadow: false,
})
export class BrxHeaderLogin {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
