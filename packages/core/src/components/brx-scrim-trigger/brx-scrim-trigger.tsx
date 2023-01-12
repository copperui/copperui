import { Component, h, Host, Listen, Prop } from '@stencil/core';
import { getWindow } from '../../utils/helpers';

@Component({
  tag: 'brx-scrim-trigger',
  styleUrl: 'brx-scrim-trigger.scss',
  shadow: false,
})
export class BrxScrimTrigger {
  @Prop({ reflect: true })
  target: HTMLBrxScrimElement | string;

  get scrim(): HTMLBrxScrimElement | null {
    const target = this.target;

    if (target) {
      if (typeof target === 'string') {
        const scrim = getWindow()?.document.querySelector(target) as HTMLBrxScrimElement | null;

        return scrim;
      }

      return target;
    }

    return null;
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
