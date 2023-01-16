import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'brx-modal',
  styleUrl: 'brx-modal.scss',
  shadow: false,
})
export class BrxModal {
  @Prop({ reflect: true })
  size: 'xsmall' | 'small' | 'medium' | 'large' | 'auto' | undefined;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
