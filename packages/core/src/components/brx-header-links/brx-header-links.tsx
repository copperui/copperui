import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brx-header-links',
  styleUrl: 'brx-header-links.scss',
  shadow: false,
})
export class BrxHeaderLinks {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
