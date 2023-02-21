import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-header-actions',
  styleUrl: 'brx-header-actions.scss',
  shadow: false,
})
export class BrxHeaderActions {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
