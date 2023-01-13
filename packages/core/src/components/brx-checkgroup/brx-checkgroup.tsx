import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brx-checkgroup',
  styleUrl: 'brx-checkgroup.scss',
  shadow: false,
})
export class BrxCheckgroup {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
