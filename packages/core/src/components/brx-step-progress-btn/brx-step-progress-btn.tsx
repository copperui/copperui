import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'brx-step-progress-btn',
  styleUrl: 'brx-step-progress-btn.scss',
  shadow: false,
})
export class BrxStepProgressBtn {
  @Prop({ reflect: true })
  alert: 'success' | 'info' | 'warning' | 'danger' | undefined;

  @Prop({ reflect: true })
  active: boolean;

  @Prop({ reflect: true })
  disabled: boolean;

  @Prop({})
  stepNum: string;

  @Prop({})
  tooltipText: string | undefined;

  id = String(Math.random());

  render() {
    const { alert, stepNum, disabled, tooltipText } = this;

    return (
      <Host>
        <brx-tooltip-auto place="top" tooltipText={tooltipText}>
          <button step-num={stepNum} disabled={disabled}>
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
