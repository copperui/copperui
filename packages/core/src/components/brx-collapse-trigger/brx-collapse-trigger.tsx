import { Component, Host, h, Prop, Element, Listen, ComponentInterface } from '@stencil/core';
import { generateUniqueId } from '../../utils/entropy';
import { findTarget } from '../../utils/helpers';

@Component({
  tag: 'brx-collapse-trigger',
  styleUrl: 'brx-collapse-trigger.scss',
  shadow: false,
})
export class BrxCollapseTrigger implements ComponentInterface {
  @Element()
  el: HTMLElement;

  @Prop({ reflect: true })
  useIcons: boolean = true;

  @Prop({ reflect: true })
  breakpoint: string | undefined;

  @Prop({ reflect: true })
  iconToHide: string = 'fa5/fas/chevron-up';

  @Prop({ reflect: true })
  iconToShow: string = 'fa5/fas/chevron-down';

  @Prop({ reflect: true, attribute: 'target' })
  propTarget: HTMLElement | string;

  get trigger() {
    return this.el;
  }

  get target(): HTMLElement | null {
    return findTarget(this.propTarget);
  }

  // TODO: Melhorar a solução
  _checkBreakpoint() {
    const { target, breakpoint } = this;

    if (target && breakpoint) {
      if (window.matchMedia('(min-width: 977px)').matches) {
        target.removeAttribute('hidden');
      }
    }
  }

  async setUp() {
    this._setVisibilityStatus();

    if (this.useIcons) {
      this._toggleIcon();
    }

    const { trigger, target } = this;

    if (trigger && target) {
      if (!trigger.hasAttribute('aria-controls')) {
        if (!target.id) {
          target.id = await generateUniqueId();
        }

        trigger.setAttribute('aria-controls', target.id);
      }
    }

    this._checkBreakpoint();
  }

  _setVisibilityStatus() {
    this._setTriggerVisibilityStatus();
    this._setTargetVisibilityStatus();
  }

  _setTriggerVisibilityStatus() {
    const { target, trigger } = this;

    if (target) {
      const isTargetHidden = target.hasAttribute('hidden');

      trigger.setAttribute('data-visible', String(!isTargetHidden));
      trigger.setAttribute('aria-expanded', String(!isTargetHidden));
    }
  }

  _setTargetVisibilityStatus() {
    const { target } = this;

    if (target) {
      const isTargetHidden = target.hasAttribute('hidden');

      target.setAttribute('aria-hidden', String(isTargetHidden));
    }
  }

  _handleTriggerClickBehavior() {
    const { trigger, breakpoint } = this;

    if (breakpoint) {
      if (window.matchMedia('(max-width: 977px)').matches) {
        this._toggleVisibility();

        if (this.useIcons) {
          this._toggleIcon();
        }

        trigger.dispatchEvent(new Event('change'));
      }
    } else {
      this._toggleVisibility();

      if (this.useIcons) {
        this._toggleIcon();
      }

      trigger.dispatchEvent(new Event('change'));
    }
  }

  _toggleVisibility() {
    const { target } = this;

    if (target) {
      if (target.hasAttribute('hidden')) {
        target.removeAttribute('hidden');
      } else {
        target.setAttribute('hidden', '');
      }

      this._setVisibilityStatus();
    }
  }

  _toggleIcon() {
    const { target, trigger, iconToShow, iconToHide } = this;

    if (target) {
      const hidden = target.hasAttribute('hidden');

      const icons: HTMLBrxIconElement[] = Array.from(trigger.querySelectorAll('brx-icon[data-collapse-icon]'));

      for (const icon of icons) {
        icon.name = hidden ? iconToShow : iconToHide;
      }
    }
  }

  @Listen('click')
  handleClick() {
    this._handleTriggerClickBehavior();
  }

  componentDidLoad(): void {
    this.setUp();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
