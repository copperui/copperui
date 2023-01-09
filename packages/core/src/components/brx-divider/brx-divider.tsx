import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'brx-divider',
  styleUrl: 'brx-divider.scss',
  shadow: false,
})
export class BrxDivider {
  @Prop({ reflect: true })
  vertical: boolean = false;

  @Prop({ reflect: true })
  dashed: boolean = false;

  @Prop({ reflect: true })
  darkMode: boolean = false;

  @Prop({ reflect: true })
  size: 'sm' | 'md' | 'lg' = 'sm';

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
