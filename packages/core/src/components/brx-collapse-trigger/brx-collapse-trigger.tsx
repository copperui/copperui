import { Component, Host, h, Prop, Element, Listen, ComponentInterface, State, Watch, Method, Event, EventEmitter } from '@stencil/core';
import { generateUniqueId } from '../../utils/entropy';
import { findTarget, toggleAttribute } from '../../utils/helpers';
import { IBrxCollapseTriggerState } from './brx-collapse-trigger-interface';

@Component({
  tag: 'brx-collapse-trigger',
  styleUrl: 'brx-collapse-trigger.scss',
  shadow: false,
})
export class BrxCollapseTrigger implements ComponentInterface, IBrxCollapseTriggerState {
  @Element()
  el: HTMLElement;

  @Event()
  brxTriggerClick: EventEmitter<void>;

  @Event()
  brxSetTargetVisibilityStatus: EventEmitter<void>;

  @Prop({ reflect: true })
  useIcons: boolean = true;

  @Prop({ reflect: true })
  breakpoint: string | undefined;

  @Prop({ reflect: true })
  iconToHide: string = 'fa5/fas/chevron-up';

  @Prop({ reflect: true })
  iconToShow: string = 'fa5/fas/chevron-down';

  @Prop({ reflect: true, attribute: 'target' })
  target: HTMLElement | string;

  @State()
  triggerEl: HTMLElement;

  @State()
  targetEl: HTMLElement | null;

  @Watch('target')
  setupElements() {
    this.triggerEl = this.el;
    this.targetEl = findTarget(this.target);
  }

  // TODO: Melhorar a solução
  _checkBreakpoint() {
    const { targetEl: target, breakpoint } = this;

    if (target && breakpoint) {
      if (window.matchMedia('(min-width: 977px)').matches) {
        target.removeAttribute('hidden');
      }
    }
  }

  async setup() {
    this.setupElements();

    this._setVisibilityStatus();

    if (this.useIcons) {
      this._toggleIcon();
    }

    const { triggerEl: trigger, targetEl: target } = this;

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
    const { targetEl: target, triggerEl: trigger } = this;

    if (target) {
      const isTargetHidden = target.hasAttribute('hidden');

      trigger.setAttribute('data-visible', String(!isTargetHidden));
      trigger.setAttribute('aria-expanded', String(!isTargetHidden));
    }
  }

  _setTargetVisibilityStatus() {
    const { targetEl: target } = this;

    if (target) {
      const isTargetHidden = target.hasAttribute('hidden');
      target.setAttribute('aria-hidden', String(isTargetHidden));
    }

    this.brxSetTargetVisibilityStatus.emit();
  }

  _handleTriggerClickBehavior() {
    const { triggerEl: trigger, breakpoint } = this;

    if (breakpoint) {
      if (window.matchMedia('(max-width: 977px)').matches) {
        this._toggleVisibility();

        if (this.useIcons) {
          this._toggleIcon();
        }

        trigger.dispatchEvent(new window.Event('change'));
      }
    } else {
      this._toggleVisibility();

      if (this.useIcons) {
        this._toggleIcon();
      }

      trigger.dispatchEvent(new window.Event('change'));
    }

    this.brxTriggerClick.emit();
  }

  _toggleVisibility() {
    const { targetEl: target } = this;

    if (target) {
      toggleAttribute(target, 'hidden');

      this._setVisibilityStatus();
    }
  }

  _toggleIcon() {
    const { targetEl: target, triggerEl: trigger, iconToShow, iconToHide } = this;

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

  @Method()
  async getTrigger() {
    return this.triggerEl;
  }

  @Method()
  async getTarget() {
    return this.targetEl;
  }

  componentWillLoad(): void {
    this.setupElements();
    this.setup();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
