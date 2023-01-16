import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brx-modal-body',
  shadow: false,
})
export class BrxModalBody {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
