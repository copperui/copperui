import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-header-search-trigger',
  styleUrl: 'brx-header-search-trigger.scss',
  shadow: false,
})
export class BrxHeaderSearchTrigger {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
