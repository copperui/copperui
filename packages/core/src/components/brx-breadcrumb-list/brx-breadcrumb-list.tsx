import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brx-breadcrumb-list',
  styleUrl: 'brx-breadcrumb-list.scss',
  shadow: false,
})
export class BrxBreadcrumbList {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
