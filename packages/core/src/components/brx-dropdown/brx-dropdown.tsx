import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-dropdown',
  styleUrl: 'brx-dropdown.scss',
  shadow: false,
})
export class BrxDropdown {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
