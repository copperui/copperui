import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { findTarget, generateUniqueId } from '../../utils/helpers';
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

  get isOpen() {
    return !this.targetEl?.hasAttribute('hidden');
  }

  @Watch('target')
  setupElements() {
    this.triggerEl = this.el;
    this.targetEl = findTarget(this.target);
  }

  // TODO: Melhorar a solução
  _checkBreakpoint() {
    const { targetEl, breakpoint } = this;

    if (targetEl && breakpoint) {
      if (window.matchMedia('(min-width: 977px)').matches) {
        targetEl.removeAttribute('hidden');
      }
    }
  }

  async setup() {
    this.setupElements();

    this._setVisibilityStatus();

    if (this.useIcons) {
      this._toggleIcon();
    }

    const { triggerEl, targetEl } = this;

    if (triggerEl && targetEl) {
      if (!triggerEl.hasAttribute('aria-controls')) {
        if (!targetEl.id) {
          targetEl.id = await generateUniqueId();
        }

        triggerEl.setAttribute('aria-controls', targetEl.id);
      }
    }

    this._checkBreakpoint();
  }

  _setVisibilityStatus() {
    this._setTriggerVisibilityStatus();
    this._setTargetVisibilityStatus();
  }

  _setTriggerVisibilityStatus() {
    const { targetEl, triggerEl } = this;

    if (targetEl) {
      const isTargetHidden = targetEl.hasAttribute('hidden');

      triggerEl.setAttribute('data-visible', String(!isTargetHidden));
      triggerEl.setAttribute('aria-expanded', String(!isTargetHidden));
    }
  }

  _setTargetVisibilityStatus() {
    const { targetEl } = this;

    if (targetEl) {
      const isTargetHidden = targetEl.hasAttribute('hidden');

      targetEl.setAttribute('aria-hidden', String(isTargetHidden));
    }

    this.brxSetTargetVisibilityStatus.emit();
  }

  _handleTriggerClickBehavior() {
    const { breakpoint } = this;

    const canChange = !breakpoint || window.matchMedia('(max-width: 977px)').matches;

    if (canChange) {
      this._toggleVisibility();

      if (this.useIcons) {
        this._toggleIcon();
      }
    }
  }

  private emitChange() {
    this.triggerEl?.dispatchEvent(new window.Event('change'));
    this.brxTriggerClick.emit();
  }

  @Method()
  async open(emitEvent: boolean = true) {
    const { targetEl } = this;

    if (targetEl) {
      this.targetEl.removeAttribute('hidden');
      this._setVisibilityStatus();

      emitEvent && this.emitChange();
    }
  }

  @Method()
  async close(emitEvent: boolean = true) {
    const { targetEl } = this;

    if (targetEl) {
      this.targetEl.setAttribute('hidden', '');
      this._setVisibilityStatus();

      emitEvent && this.emitChange();
    }
  }

  _toggleVisibility(emitEvent: boolean = true) {
    if (this.isOpen) {
      this.close(emitEvent);
    } else {
      this.open(emitEvent);
    }
  }

  _toggleIcon() {
    const { targetEl, triggerEl, iconToShow, iconToHide } = this;

    if (targetEl) {
      const hidden = targetEl.hasAttribute('hidden');

      const icons: HTMLBrxIconElement[] = Array.from(triggerEl.querySelectorAll('brx-icon[data-collapse-icon]'));

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

  @Method()
  async getIsOpen() {
    return this.isOpen;
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
