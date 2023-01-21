import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'brx-tabs-panel',
  styleUrl: 'brx-tabs-panel.scss',
  shadow: false,
})
export class BrxTabsPanel {
  @Prop({ reflect: true })
  active = false;

  @Prop({ reflect: true })
  value: string | undefined;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
