import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-header-menu-trigger',
  styleUrl: 'brx-header-menu-trigger.scss',
  shadow: false,
})
export class BrxHeaderMenuTrigger {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
