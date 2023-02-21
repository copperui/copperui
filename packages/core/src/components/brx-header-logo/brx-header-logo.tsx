import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-header-logo',
  styleUrl: 'brx-header-logo.scss',
  shadow: false,
})
export class BrxHeaderLogo {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
