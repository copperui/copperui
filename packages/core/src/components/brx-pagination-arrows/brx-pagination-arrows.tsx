import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brx-pagination-arrows',
  styleUrl: 'brx-pagination-arrows.scss',
  shadow: false,
})
export class BrxPaginationArrows {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
