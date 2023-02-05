import { Component, Host, h, Prop, ComponentInterface, Method, Element } from '@stencil/core';
import { generateUniqueId } from '../../utils/helpers';

@Component({
  tag: 'brx-step-progress-btn',
  styleUrl: 'brx-step-progress-btn.scss',
  shadow: false,
})
export class BrxStepProgressBtn implements ComponentInterface {
  @Element()
  el: HTMLElement;

  get buttonNative() {
    return this.el.querySelector('button');
  }

  @Prop({ reflect: true })
  alert: 'success' | 'info' | 'warning' | 'danger' | undefined;

  @Prop({ reflect: true, mutable: true })
  active: boolean;

  @Prop({ reflect: true, mutable: true })
  disabled: boolean;

  @Prop({})
  stepNum: string;

  @Prop({})
  tooltipText: string | undefined;

  @Method()
  setDisabled(disabled: boolean) {
    this.disabled = disabled;

    return Promise.resolve();
  }

  @Method()
  setActive(active: boolean) {
    this.active = active;

    if (active) {
      this.setDisabled(false);
    }

    return Promise.resolve();
  }

  render() {
    const { alert, stepNum, disabled, tooltipText } = this;

    return (
      <Host tabindex="-1">
        <brx-tooltip-auto place="top" tooltipText={tooltipText}>
          <button tabIndex={0} step-num={stepNum} disabled={disabled}>
            <span class="step-info">
              <slot name="step-info"></slot>
            </span>

            <slot></slot>

            {alert && (
              <span class="step-alert">
                <slot name="step-alert"></slot>
              </span>
            )}
          </button>
        </brx-tooltip-auto>
      </Host>
    );
  }
}
