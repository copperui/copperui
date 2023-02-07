import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { T as TOKEN_UNCONTROLLED, i as isControlled } from './tokens-3a672c03.js';
import { b as findTarget, f as findTargets, e as enqueueIdleCallback, a as generateUniqueId } from './helpers-da43c71e.js';

const brxRadioCss = "brx-radio{--radio-size:24px;--radio-bullet-size:16px;--radio-bullet-position:calc((var(--radio-size) - var(--radio-bullet-size)) * 0.5);display:block}brx-radio+brx-radio{margin-top:var(--spacing-scale-base)}brx-radio input{opacity:0;position:absolute}brx-radio input+label{cursor:pointer;display:inline-block;margin-bottom:0;min-height:var(--radio-size);min-width:var(--radio-size);padding-left:calc(var(--spacing-scale-base) + var(--radio-size));position:relative}brx-radio input+label::before{background:var(--background);border:1px solid var(--border-color);border-radius:50%;content:\"\";height:var(--radio-size);left:0;position:absolute;top:-1px;width:var(--radio-size)}brx-radio input+label:empty{padding:0}brx-radio input+label:empty::before{top:0}brx-radio label{font-weight:var(--font-weight-medium)}brx-radio input:checked+label::after{background:var(--selected);border:7px solid var(--selected);border-radius:50%;content:\"\";height:var(--radio-bullet-size);left:var(--radio-bullet-position);position:absolute;right:0;top:calc(var(--radio-bullet-position) - 1px);width:var(--radio-bullet-size)}brx-radio input:checked+label:empty::after{top:var(--radio-bullet-position)}brx-radio.is-valid input+label::before,brx-radio.valid input+label::before,brx-radio[valid] input+label::before,brx-radio[state=valid] input+label::before{border-color:var(--success)}brx-radio.is-invalid input+label::before,brx-radio.invalid input+label::before,brx-radio[invalid] input+label::before,brx-radio[state=invalid] input+label::before{border-color:var(--danger)}brx-radio.is-small input+label,brx-radio.small input+label,brx-radio[small] input+label,brx-radio[size=small] input+label{line-height:var(--spacing-scale-2xh);min-height:var(--spacing-scale-2xh)}brx-radio.is-small input+label::before,brx-radio.small input+label::before,brx-radio[small] input+label::before,brx-radio[size=small] input+label::before{height:var(--spacing-scale-2xh);width:var(--spacing-scale-2xh)}brx-radio.is-small input:checked+label::after,brx-radio.small input:checked+label::after,brx-radio[small] input:checked+label::after,brx-radio[size=small] input:checked+label::after{border-width:4px;height:10px;width:10px}brx-radio input:invalid+label::before{border-color:var(--danger)}brx-radio input:focus-visible:checked+label::before,brx-radio input:focus-visible+label::before,brx-radio input.focus-visible:checked+label::before,brx-radio input.focus-visible+label::before{border-color:var(--focus) !important;box-shadow:0 0 0 var(--surface-width-md) var(--focus);outline:none}brx-radio input:hover:not(:disabled)+label::before{background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-radio.inverted,brx-radio.inverted label,brx-radio.dark-mode,brx-radio.dark-mode label,brx-radio[dark-mode],brx-radio[dark-mode] label{color:var(--color-dark)}";

const BrxRadio = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxFocus = createEvent(this, "brxFocus", 7);
    this.brxBlur = createEvent(this, "brxBlur", 7);
    this.brxChange = createEvent(this, "brxChange", 7);
    this.brxUpdate = createEvent(this, "brxUpdate", 7);
    this.syncCheckedFromRadioGroup = async () => {
      const radioGroup = this.radioGroup;
      if (radioGroup) {
        const radioGroupValue = await radioGroup.getCurrentValue();
        const isChecked = radioGroupValue === this.value;
        this.currentChecked = isChecked;
        this.nativeInputChecked = isChecked;
      }
    };
    this.syncCheckedFromNative = () => {
      this.setChecked(this.nativeInputChecked);
    };
    this.onFocus = () => {
      this.brxFocus.emit();
    };
    this.onBlur = () => {
      this.brxBlur.emit();
    };
    this.onChange = (event) => {
      event.preventDefault();
      const oldChecked = this.currentChecked;
      const newChecked = this.nativeInputChecked;
      this.nativeInputChecked = oldChecked;
      this.setChecked(newChecked);
    };
    this.checked = undefined;
    this.controlledChecked = TOKEN_UNCONTROLLED;
    this.currentChecked = false;
    this.buttonTabindex = -1;
    this.name = undefined;
    this.disabled = false;
    this.value = undefined;
    this.label = undefined;
    this.inputId = undefined;
  }
  get nativeInput() {
    return findTarget('input', this.el);
  }
  get nativeInputChecked() {
    var _a, _b;
    return (_b = (_a = this.nativeInput) === null || _a === void 0 ? void 0 : _a.checked) !== null && _b !== void 0 ? _b : false;
  }
  set nativeInputChecked(value) {
    if (this.nativeInput) {
      this.nativeInput.checked = value;
    }
  }
  get radioGroup() {
    var _a;
    return (_a = this.el.closest('brx-radio-group')) !== null && _a !== void 0 ? _a : null;
  }
  get isStandaloneFamilyControlled() {
    const standaloneGroupRadios = findTargets(`brx-radio[name="${this.name}"]`);
    return standaloneGroupRadios.some(brxRadio => isControlled(brxRadio.controlledChecked));
  }
  emitChange(checked = this.currentChecked, force = false) {
    const value = this.value;
    if (checked || force) {
      this.brxChange.emit({ value, checked });
    }
  }
  syncCurrentChecked() {
    const incomingChecked = this.controlledChecked !== TOKEN_UNCONTROLLED ? this.controlledChecked : this.checked;
    this.currentChecked = incomingChecked;
  }
  handleStateChange() {
    this.emitChange();
  }
  handleCurrentCheckedChange() {
    this.nativeInputChecked = this.currentChecked;
  }
  setChecked(checked = false) {
    if (!isControlled(this.controlledChecked) && !this.radioGroup && !this.isStandaloneFamilyControlled) {
      // Unecessary to emit change because the watch of currentChecked will handle it
      this.currentChecked = checked;
    }
    else {
      this.emitChange(checked);
    }
  }
  emitUpdateEvent() {
    const value = this.value;
    const checked = this.currentChecked;
    this.brxUpdate.emit({ value, checked });
  }
  async setFocus() {
    // event.stopPropagation();
    // event.preventDefault();
    this.el.focus();
  }
  async setButtonTabindex(value) {
    this.buttonTabindex = value;
  }
  async getCurrentState() {
    return {
      value: this.value,
      checked: this.currentChecked,
    };
  }
  handleGlobalRadioChange(event) {
    const target = event.target;
    const brxRadio = target === null || target === void 0 ? void 0 : target.closest('brx-radio');
    if (brxRadio) {
      this.nativeInputChecked = this.currentChecked;
      if (!this.radioGroup) {
        enqueueIdleCallback(() => {
          this.syncCheckedFromNative();
        });
      }
    }
  }
  handleGlobalRadioGroupUpdate(event) {
    const target = event.target;
    const brxRadioGroup = target === null || target === void 0 ? void 0 : target.closest('brx-radio-group');
    if (brxRadioGroup && brxRadioGroup === this.radioGroup) {
      this.syncCheckedFromRadioGroup();
    }
  }
  connectedCallback() {
    this.syncCheckedFromRadioGroup();
  }
  componentWillLoad() {
    if (!this.inputId) {
      this.inputId = generateUniqueId();
    }
    this.syncCurrentChecked();
  }
  render() {
    const labelId = `${this.inputId}-lbl`;
    return (h(Host, { role: "radio", onBlur: this.onBlur, onFocus: this.onFocus, disabled: this.disabled, "aria-labelledby": labelId, tabindex: this.buttonTabindex, "data-checked": this.currentChecked, "aria-checked": `${this.currentChecked}`, "aria-hidden": this.disabled ? 'true' : null }, h("input", { type: "radio", name: this.name, id: this.inputId, value: this.value, disabled: this.disabled, onChange: this.onChange, checked: this.currentChecked }), h("label", { htmlFor: this.inputId, id: labelId }, this.label)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "checked": ["syncCurrentChecked"],
    "controlledChecked": ["syncCurrentChecked"],
    "value": ["handleStateChange", "emitUpdateEvent"],
    "currentChecked": ["handleStateChange", "handleCurrentCheckedChange", "emitUpdateEvent"]
  }; }
};
BrxRadio.style = brxRadioCss;

export { BrxRadio as brx_radio };
