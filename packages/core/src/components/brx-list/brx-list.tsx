import { Component, Host, h, Prop } from '@stencil/core';

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

  render() {
    return (
      <Host role="list">
        <slot></slot>
      </Host>
    );
  }
}
