import { r as registerInstance, h, e as Host, g as getElement } from './index-1e49f12c.js';

const brxStepProgressBtnCss = "brx-step-progress-btn{display:block}";

const BrxStepProgressBtn = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.alert = undefined;
    this.active = undefined;
    this.disabled = undefined;
    this.stepNum = undefined;
    this.tooltipText = undefined;
  }
  get buttonNative() {
    return this.el.querySelector('button');
  }
  setDisabled(disabled) {
    this.disabled = disabled;
    return Promise.resolve();
  }
  setActive(active) {
    this.active = active;
    if (active) {
      this.setDisabled(false);
    }
    return Promise.resolve();
  }
  render() {
    const { alert, stepNum, disabled, tooltipText } = this;
    return (h(Host, { tabindex: "-1" }, h("brx-tooltip-auto", { place: "top", tooltipText: tooltipText }, h("button", { tabIndex: 0, "step-num": stepNum, disabled: disabled }, h("span", { class: "step-info" }, h("slot", { name: "step-info" })), h("slot", null), alert && (h("span", { class: "step-alert" }, h("slot", { name: "step-alert" })))))));
  }
  get el() { return getElement(this); }
};
BrxStepProgressBtn.style = brxStepProgressBtnCss;

export { BrxStepProgressBtn as brx_step_progress_btn };
