import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brx-card-footer',
  styleUrl: 'brx-card-footer.scss',
  shadow: false,
})
export class BrxCardFooter {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
