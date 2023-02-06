import { Component, h, Host, Listen, Prop } from '@stencil/core';
import { findTarget } from '../../utils/helpers';

@Component({
  tag: 'brx-scrim-trigger',
  styleUrl: 'brx-scrim-trigger.scss',
  shadow: false,
})
export class BrxScrimTrigger {
  @Prop({ reflect: true })
  target: HTMLBrxScrimElement | string;

  get scrimElement(): HTMLBrxScrimElement | null {
    return findTarget<HTMLBrxScrimElement>(this.target);
  }

  @Listen('click')
  handleClick() {
    const scrim = this.scrimElement;

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
