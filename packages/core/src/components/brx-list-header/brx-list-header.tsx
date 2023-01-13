import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'brx-list-header',
  shadow: false,
})
export class BrxListHeader {
  @Prop({ reflect: true })
  headerTitle: string;

  render() {
    return (
      <Host>
        <slot name="title">
          <div class="brx-header-title">{this.headerTitle}</div>
        </slot>
      </Host>
    );
  }
}
