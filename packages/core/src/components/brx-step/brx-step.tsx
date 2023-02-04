import { Component, Host, h, State, Element, Listen, ComponentInterface, Prop, Watch, Method, Event, EventEmitter } from '@stencil/core';
import { TOKEN_UNCONTROLLED } from '../../tokens';
import { enqueueIdleCallback, findTargets } from '../../utils/helpers';
import { StepChangeEventDetail } from './brx-step-interface';

const DOMstrings = {
  step: 'brx-step',
  progress: 'brx-step-progress',
  progressButton: 'brx-step-progress-btn',
  progressButtonTrigger: 'brx-step-progress-btn button',
} as const;

@Component({
  tag: 'brx-step',
  styleUrl: 'brx-step.scss',
  shadow: false,
})
export class BrxStep implements ComponentInterface {
  @Element()
  el: HTMLElement;

  @Event()
  brxStepChange: EventEmitter<StepChangeEventDetail>;

  get progressItems() {
    return findTargets<HTMLBrxStepProgressBtnElement>(DOMstrings.progressButton, this.el, ['child']);
  }

  get currentFocusedIndex() {
    return Math.max(
      this.progressItems.findIndex(i => i.contains(document.activeElement)),
      0,
    );
  }

  @Prop()
  type: 'simple' | 'text' | 'void' | undefined;

  @Prop()
  value: number | undefined;

  @Prop()
  controlledValue: number | undefined | TOKEN_UNCONTROLLED = TOKEN_UNCONTROLLED;

  @State()
  currentValue: number | undefined;

  @Watch('value')
  @Watch('controlledValue')
  syncCurrentValueFromProps() {
    const targetValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
    this.currentValue = targetValue ?? 0;
  }

  @Method()
  setCurrentValue(value: number | undefined) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = value;
    }

    this.brxStepChange.emit({ value });

    return Promise.resolve();
  }

  openStep(stepIndex: number) {
    const { progressItems: progressButtons } = this;

    for (const [index, button] of progressButtons.entries()) {
      const active = index === stepIndex;
      button.setActive(active);
    }
  }

  @Watch('currentValue')
  syncSteps() {
    this.openStep(this.currentValue);
  }

  @Watch('type')
  renderStepsContent() {
    const { progressItems: progressButtons } = this;

    for (const [index, element] of progressButtons.entries()) {
      const isTypeText = this.type === 'text';
      const isTypeImg = element.querySelector('.step-icon');

      const stepNum = isTypeText ? `${index + 1}/${progressButtons.length}` : isTypeImg ? '' : `${index + 1}`;
      element.setAttribute('step-num', stepNum);
    }
  }

  get focusedTabItemIndex() {
    return this.progressItems.findIndex(i => i.contains(document.activeElement));
  }

  @Listen('click')
  handleProgressButtonClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const trigger = target.closest<HTMLButtonElement>(DOMstrings.progressButtonTrigger);

    if (trigger) {
      const button = trigger.closest<HTMLBrxStepProgressBtnElement>(DOMstrings.progressButton);

      const disabled = trigger?.disabled || button.disabled;

      if (!disabled) {
        const targetIndex = this.progressItems.indexOf(button);

        this.setCurrentValue(targetIndex);

        enqueueIdleCallback(() => {
          trigger.focus();
        });
      }
    }
  }

  componentWillLoad() {
    this.syncCurrentValueFromProps();
  }

  connectedCallback() {
    enqueueIdleCallback(() => {
      this.renderStepsContent();
    });
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
