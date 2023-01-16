import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'brx-skiplink',
  styleUrl: 'brx-skiplink.scss',
  shadow: false,
})
export class BrxSkiplink {
  @Prop({ reflect: true })
  full: boolean;

  render() {
    return (
      <Host role="navigation">
        <slot></slot>
      </Host>
    );
  }
}
