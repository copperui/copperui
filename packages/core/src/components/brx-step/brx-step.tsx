import { Component, Host, h, State, Element, Listen, ComponentInterface, Prop, Watch, Method, Event, EventEmitter } from '@stencil/core';
import { StepChangeEventDetail } from './brx-step-interface';

const DOMstrings = {
  step: 'brx-step',
  stepProgress: 'brx-step-progress',
  stepProgressBtn: 'brx-step-progress-btn',
  stepProgressBtnTrigger: 'brx-step-progress-btn button',
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

  @Prop()
  type: 'simple' | 'text' | 'void' | undefined;

  @Prop()
  controlled = false;

  @Prop()
  value: number | null = null;

  @Prop()
  defaultValue: number | undefined;

  @State()
  activeStep = 0;

  get progressBtns() {
    return Array.from<HTMLBrxStepProgressBtnElement>(this.el.querySelectorAll(DOMstrings.stepProgressBtn));
  }

  clean() {
    const activeableElements = Array.from(this.el.querySelectorAll('button'));

    for (const element of activeableElements) {
      element.classList.remove('focus-visible');
    }
  }

  hiddenTooltips() {
    const tooltips = Array.from(this.el.querySelectorAll('brx-tooltip'));

    for (const tooltip of tooltips) {
      tooltip.hide();
    }
  }

  openStep(targetIndex: number) {
    const { progressBtns } = this;

    for (const btn of progressBtns) {
      const index = progressBtns.indexOf(btn);

      btn.active = index === targetIndex;

      if (btn.active) {
        btn.disabled = false;
      }
    }
  }

  syncSteps() {
    this.openStep(this.activeStep);
  }

  renderStepsContent() {
    const { progressBtns } = this;

    for (const element of progressBtns) {
      const index = progressBtns.indexOf(element);

      const isTypeText = this.type === 'text';
      const isTypeImg = element.querySelector('.step-icon');

      const stepNum = isTypeText ? `${index + 1}/${this.progressBtns.length}` : isTypeImg ? '' : `${index + 1}`;

      element.setAttribute('step-num', stepNum);
    }
  }

  @Method()
  updateActiveStep(value: number | undefined) {
    if (this.value === null) {
      this.activeStep = value;
    }

    this.brxStepChange.emit({ value });

    return Promise.resolve();
  }

  @Watch('value')
  handleValueChange() {
    this.activeStep = this.value;
  }

  @Watch('activeStep')
  handleActiveStepChange() {
    this.syncSteps();
  }

  @Listen('click')
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const trigger = target.closest<HTMLButtonElement>(DOMstrings.stepProgressBtnTrigger);
    const progressBtn = trigger?.closest<HTMLBrxStepProgressBtnElement>(DOMstrings.stepProgressBtn);

    if (trigger && !trigger.disabled && !progressBtn.disabled) {
      const activeStepNum = this.progressBtns.indexOf(progressBtn);
      this.updateActiveStep(activeStepNum);
    }
  }

  @Listen('focusout')
  handleFocusOut() {
    this.clean();
    this.hiddenTooltips();
  }

  componentWillLoad() {
    this.renderStepsContent();

    this.updateActiveStep(this.defaultValue ?? 0);

    this.syncSteps();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
