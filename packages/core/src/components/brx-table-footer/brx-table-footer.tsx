import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'brx-table-footer',
  styleUrl: 'brx-table-footer.scss',
  shadow: false,
})
export class BrxTableFooter {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
