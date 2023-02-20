import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-menu-social-network',
  styleUrl: 'brx-menu-social-network.scss',
  shadow: false,
})
export class BrxMenuSocialNetwork {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
