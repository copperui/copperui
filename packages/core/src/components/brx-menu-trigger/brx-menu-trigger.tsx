import { Component, Element, h, Host, Listen, Prop } from '@stencil/core';
import { findTarget } from '../../utils/helpers';

@Component({
  tag: 'brx-menu-trigger',
  styleUrl: 'brx-menu-trigger.scss',
  shadow: true,
})
export class BrxMenuTrigger {
  @Element()
  el: HTMLElement;

  @Prop()
  target: string | HTMLMenuElement | null = null;

  get menuEl(): HTMLBrxMenuElement | null {
    return (this.target && findTarget<HTMLBrxMenuElement>(this.target)) ?? this.el.closest('brx-menu');
  }

  @Listen('click')
  handleClick() {
    const menuEl = this.menuEl;

    if (menuEl) {
      menuEl.toggleMenu();
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
