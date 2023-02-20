import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-menu-folder',
  styleUrl: 'brx-menu-folder.scss',
  shadow: false,
})
export class BrxMenuFolder {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
