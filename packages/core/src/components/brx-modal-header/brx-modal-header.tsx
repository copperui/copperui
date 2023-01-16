import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brx-modal-header',
  shadow: false,
})
export class BrxModalHeader {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
