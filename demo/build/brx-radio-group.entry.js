import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { T as TOKEN_UNCONTROLLED } from './tokens-3a672c03.js';
import { f as findTargets, b as findTarget, a as generateUniqueId } from './helpers-da43c71e.js';

const BrxRadioGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxRadioGroupChange = createEvent(this, "brxRadioGroupChange", 7);
    this.brxRadioGroupUpdate = createEvent(this, "brxRadioGroupUpdate", 7);
    this.labelId = undefined;
    this.label = undefined;
    this.name = undefined;
    this.value = undefined;
    this.controlledValue = TOKEN_UNCONTROLLED;
    this.currentValue = undefined;
    this.allowEmptySelection = false;
  }
  get radioElements() {
    return findTargets('brx-radio', this.el);
  }
  syncCurrentValueFromProps() {
    const targetValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
    this.currentValue = String(targetValue !== null && targetValue !== void 0 ? targetValue : '');
  }
  setValue(value) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = value;
    }
    this.brxRadioGroupChange.emit({ value });
  }
  handleCurrentValueChange() {
    this.brxRadioGroupUpdate.emit({ value: this.currentValue });
  }
  getCurrentValue() {
    return Promise.resolve(this.currentValue);
  }
  handleRadioBrxChange(event) {
    const target = event.target;
    const brxRadio = target === null || target === void 0 ? void 0 : target.closest('brx-radio');
    if (brxRadio) {
      const { checked } = event.detail;
      if (checked) {
        event.preventDefault();
        const currentValue = this.currentValue;
        const newValue = brxRadio.value;
        if (newValue !== currentValue) {
          this.setValue(newValue);
        }
        else if (this.allowEmptySelection) {
          this.setValue(undefined);
        }
      }
    }
  }
  connectedCallback() {
    var _a;
    const label = findTarget(this.label);
    if (label) {
      if (!label.id) {
        label.id = (_a = this.labelId) !== null && _a !== void 0 ? _a : generateUniqueId();
      }
      this.labelId = label.id;
    }
    this.syncCurrentValueFromProps();
  }
  render() {
    const { label, labelId } = this;
    return (h(Host, { role: "radiogroup", "aria-labelledby": label ? labelId : null }, h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["syncCurrentValueFromProps"],
    "controlledValue": ["syncCurrentValueFromProps"],
    "currentValue": ["handleCurrentValueChange"]
  }; }
};

export { BrxRadioGroup as brx_radio_group };
