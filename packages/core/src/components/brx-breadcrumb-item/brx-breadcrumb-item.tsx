import { Component, Host, h, Prop, Fragment } from '@stencil/core';

@Component({
  tag: 'brx-breadcrumb-item',
  styleUrl: 'brx-breadcrumb-item.scss',
  shadow: false,
})
export class BrxBreadcrumbItem {
  @Prop({ reflect: true })
  home: boolean = false;

  @Prop({ reflect: true })
  active: boolean = false;

  render() {
    return (
      <Host>
        {!this.home && (
          <Fragment>
            <brx-icon class="icon" name="fa5/fas/chevron-right"></brx-icon>
          </Fragment>
        )}

        <slot></slot>
      </Host>
    );
  }
}
