import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'brx-list',
  styleUrl: 'brx-list.scss',
  shadow: false,
})
export class BrxList {
  @Prop({ reflect: true })
  horizontal: boolean;

  @Prop({ reflect: true })
  lines: 'one' | 'two' | 'three' | undefined;

  @Prop({ reflect: true })
  headerTitle: string | undefined;

  render() {
    return (
      <Host role="list">
        {this.headerTitle && <brx-list-header headerTitle={this.headerTitle}></brx-list-header>}
        <slot></slot>
      </Host>
    );
  }
}
