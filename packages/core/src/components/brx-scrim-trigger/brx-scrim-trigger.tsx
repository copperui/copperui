import { Component, h, Host, Listen, Prop } from '@stencil/core';
import { findTarget, getWindow } from '../../utils/helpers';

@Component({
  tag: 'brx-scrim-trigger',
  styleUrl: 'brx-scrim-trigger.scss',
  shadow: false,
})
export class BrxScrimTrigger {
  @Prop({ reflect: true })
  target: HTMLBrxScrimElement | string;

  get scrim(): HTMLBrxScrimElement | null {
    return findTarget(this.target);
  }

  @Listen('click')
  handleClick() {
    const scrim = this.scrim;

    if (scrim) {
      scrim.showScrim();
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
