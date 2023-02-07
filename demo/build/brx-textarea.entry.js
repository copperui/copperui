import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { T as TOKEN_UNCONTROLLED } from './tokens-3a672c03.js';
import { a as generateUniqueId } from './helpers-da43c71e.js';
import { i as inheritAriaAttributes, a as inheritAttributes } from './inherited-attributes-f0d17fe4.js';

const brxTextareaCss = "brx-textarea{--textarea-padding:var(--textarea-medium);--textarea-small:var(--spacing-scale-base);--textarea-medium:var(--spacing-scale-baseh);--textarea-large:var(--spacing-scale-2x);color:var(--color)}brx-textarea label{display:inline-block;margin-bottom:var(--spacing-scale-half)}brx-textarea textarea{background:var(--background-light);border:1px solid var(--border-color);border-radius:6px;color:var(--color);display:block;font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-medium);padding:var(--textarea-padding);width:100%}brx-textarea[disabled]{opacity:unset}brx-textarea[inline] .brx-textarea-wrapper{display:flex}brx-textarea[size=small] textarea{--textarea-padding:var(--textarea-small)}brx-textarea[size=medium] textarea{--textarea-padding:var(--textarea-medium)}brx-textarea[size=large] textarea{--textarea-padding:var(--textarea-large)}brx-textarea[color=success] textarea{border-color:var(--success);border-width:2px}brx-textarea[color=danger] textarea{border-color:var(--danger);border-width:2px}brx-textarea[color=warning] textarea{border-color:var(--warning);border-width:2px}brx-textarea[color=info] textarea{border-color:var(--info);border-width:2px}brx-textarea textarea:focus,brx-textarea textarea:focus-visible,brx-textarea textarea.focus-visible{border-color:var(--focus) !important;box-shadow:0 0 0 var(--surface-width-md) var(--focus);outline:none}brx-textarea textarea:hover:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-textarea[dark-mode],brx-textarea[dark-mode] label{--color:var(--color-dark);--focus-color:var(--focus-color-dark)}";

const BrxTextarea = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxChange = createEvent(this, "brxChange", 7);
    this.brxInput = createEvent(this, "brxInput", 7);
    this.brxBlur = createEvent(this, "brxBlur", 7);
    this.brxFocus = createEvent(this, "brxFocus", 7);
    this.didBlurAfterEdit = false;
    this.nativeInput = null;
    this.onInput = (event) => {
      const oldValue = this.getValue();
      const newValue = this.nativeInput.value;
      this.nativeInput.value = oldValue;
      this.setValue(newValue);
      this.brxInput.emit(event);
    };
    this.onFocus = (event) => {
      this.hasFocus = true;
      this.focusChange();
      if (this.fireFocusEvents) {
        this.brxFocus.emit(event);
      }
    };
    this.onBlur = (ev) => {
      this.hasFocus = false;
      this.focusChange();
      if (this.fireFocusEvents) {
        this.brxBlur.emit(ev);
      }
    };
    this.onKeyDown = () => {
      this.checkClearOnEdit();
    };
    this.inputId = undefined;
    this.value = undefined;
    this.controlledValue = TOKEN_UNCONTROLLED;
    this.currentValue = '';
    this.darkMode = undefined;
    this.label = undefined;
    this.inline = undefined;
    this.counter = undefined;
    this.color = undefined;
    this.fireFocusEvents = true;
    this.autocapitalize = 'none';
    this.autofocus = false;
    this.clearOnEdit = false;
    this.disabled = false;
    this.inputmode = undefined;
    this.enterkeyhint = undefined;
    this.maxlength = undefined;
    this.minlength = undefined;
    this.name = undefined;
    this.placeholder = undefined;
    this.readonly = false;
    this.required = false;
    this.spellcheck = false;
    this.cols = undefined;
    this.rows = undefined;
    this.wrap = undefined;
    this.hasFocus = false;
  }
  hasValue() {
    return this.getValue() !== '';
  }
  getValue() {
    var _a;
    return String((_a = this.currentValue) !== null && _a !== void 0 ? _a : '');
  }
  syncCurrentValueFromProps() {
    const targetValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
    this.currentValue = String(targetValue !== null && targetValue !== void 0 ? targetValue : '');
  }
  setValue(value) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = value;
    }
    this.brxChange.emit({ value: value });
  }
  /**
   * Sets focus on the native `textarea` in `brx-textarea`. Use this method instead of the global
   * `textarea.focus()`.
   */
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }
  /**
   * Sets blur on the native `textarea` in `brx-textarea`. Use this method instead of the global
   * `textarea.blur()`.
   * @internal
   */
  async setBlur() {
    if (this.nativeInput) {
      this.nativeInput.blur();
    }
  }
  /**
   * Returns the native `<textarea>` element used under the hood.
   */
  getInputElement() {
    return Promise.resolve(this.nativeInput);
  }
  /**
   * Check if we need to clear the text input if clearOnEdit is enabled
   */
  checkClearOnEdit() {
    if (!this.clearOnEdit) {
      return;
    }
    // Did the input value change after it was blurred and edited?
    if (this.didBlurAfterEdit && this.hasValue()) {
      // Clear the input
      this.currentValue = '';
    }
    // Reset the flag
    this.didBlurAfterEdit = false;
  }
  focusChange() {
    // If clearOnEdit is enabled and the input blurred but has a value, set a flag
    if (this.clearOnEdit && !this.hasFocus && this.hasValue()) {
      this.didBlurAfterEdit = true;
    }
  }
  componentWillLoad() {
    if (!this.inputId) {
      this.inputId = generateUniqueId();
    }
    this.syncCurrentValueFromProps();
  }
  get inheritedAttributes() {
    return Object.assign(Object.assign({}, inheritAriaAttributes(this.el)), inheritAttributes(this.el, ['data-form-type', 'title']));
  }
  render() {
    const value = this.getValue();
    const labelId = this.inputId + '-lbl';
    return (h(Host, { "aria-disabled": this.disabled ? 'true' : null }, h("div", { class: this.inline ? 'row' : '' }, h("div", { class: "col-auto pt-half" }, h("label", { htmlFor: this.inputId }, this.label)), h("div", { class: "col" }, h("textarea", Object.assign({ value: value, cols: this.cols, rows: this.rows, wrap: this.wrap, name: this.name, id: this.inputId, required: this.required, readOnly: this.readonly, disabled: this.disabled, minLength: this.minlength, maxLength: this.maxlength, autoFocus: this.autofocus, inputMode: this.inputmode, spellcheck: this.spellcheck, enterKeyHint: this.enterkeyhint, "aria-labelledby": labelId !== null && labelId !== void 0 ? labelId : null, autoCapitalize: this.autocapitalize, ref: el => (this.nativeInput = el), placeholder: this.placeholder || '', onInput: this.onInput, onBlur: this.onBlur, onFocus: this.onFocus, onKeyDown: this.onKeyDown }, this.inheritedAttributes), value), this.counter === 'limit' && typeof this.maxlength === 'number' && (h("div", { class: "text-base mt-1" }, value.length === 0 && (h("span", { class: "limit" }, "Limite m\u00E1ximo de ", h("strong", null, this.maxlength), " caracteres.")), value.length > 0 && h("span", { class: "current" }, "Restam ", Math.max(this.maxlength - value.length, 0), " caracteres."))), this.counter === 'total' && (h("div", { class: "text-base mt-1" }, h("span", { class: "characters" }, h("strong", null, value.length), " caracteres digitados."))), h("slot", null)))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["syncCurrentValueFromProps"],
    "controlledValue": ["syncCurrentValueFromProps"]
  }; }
};
BrxTextarea.style = brxTextareaCss;

export { BrxTextarea as brx_textarea };
