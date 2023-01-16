import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brx-modal-footer',
  shadow: false,
})
export class BrxModalFooter {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
