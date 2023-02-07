import { r as registerInstance, f as createEvent, h, e as Host, F as Fragment, g as getElement } from './index-1e49f12c.js';
import { T as TOKEN_UNCONTROLLED } from './tokens-3a672c03.js';
import { a as generateUniqueId } from './helpers-da43c71e.js';
import { i as inheritAriaAttributes } from './inherited-attributes-f0d17fe4.js';

const brxInputCss = "brx-input{display:block;--input-button-margin:var(--spacing-scale-half);--input-padding:0 var(--spacing-scale-2x);--input-padding-button:var(--spacing-scale-5x);--input-padding-icon:var(--spacing-scale-5x);--input-size:var(--input-medium);--input-small:32px;--input-medium:40px;--input-large:48px;--input-highlight:56px;--color:var(--color-light);--color-rgb:var(--color-light-rgb);--text-color:var(--color);--interactive:var(--interactive-light);--interactive-rgb:var(--interactive-light-rgb);--visited:var(--visited-light);--hover:var(--hover-light);--pressed:var(--pressed-light);--focus-color:var(--focus-color-light);--focus:var(--focus-color);color:var(--color);position:relative}brx-input input{background-color:var(--background-light);border-color:var(--border-color-alternative);border-radius:var(--surface-rounder-sm);border-style:var(--border-style);border-width:var(--border-width);color:var(--color-light);display:block;font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-medium);height:var(--input-size);margin-top:var(--spacing-scale-half);padding-bottom:0;padding-left:var(--spacing-scale-2x);padding-right:var(--spacing-scale-2x);padding-top:0;width:100%}brx-input input::-ms-reveal,brx-input input::-ms-clear,brx-input input::-webkit-calendar-picker-indicator{display:none}brx-input input[type=search]::-webkit-search-decoration,brx-input input[type=search]::-webkit-search-cancel-button,brx-input input[type=search]::-webkit-search-results-button,brx-input input[type=search]::-webkit-search-results-decoration{appearance:none}brx-input[disabled]{opacity:unset}brx-input[inline]{display:flex}brx-input[inline] .brx-input-label{margin-right:var(--spacing-scale-baseh);margin-top:calc(var(--input-size) * 0.5 - var(--spacing-scale-half))}brx-input[inline] .brx-input-content{flex:1}brx-input .brx-input-group{position:relative}brx-input .brx-input-icon{display:flex;align-items:center;position:absolute;color:var(--border-color-alternative);height:var(--input-size);margin-left:var(--spacing-scale-baseh)}brx-input .brx-input-icon+input{padding-left:var(--input-padding-icon)}brx-input brx-button{--button-size:var(--button-small);float:right;position:relative;transform:translateY(calc((var(--input-size) - var(--button-size)) * 0.5));margin-right:var(--input-button-margin);margin-top:calc((var(--input-size) + var(--spacing-scale-half)) * -1)}brx-input brx-button .brx-button-native{--color:var(--color-light);--color-rgb:var(--color-light-rgb);--text-color:var(--color);--interactive:var(--interactive-light);--interactive-rgb:var(--interactive-light-rgb);--visited:var(--visited-light);--hover:var(--hover-light);--pressed:var(--pressed-light);--focus-color:var(--focus-color-light);--focus:var(--focus-color);border-radius:50%;padding:0;width:var(--button-size)}brx-input[button] input{padding-right:var(--input-padding-button)}brx-input[icon] input{padding-right:var(--input-padding-icon)}brx-input[icon] brx-button[circle]{float:right;margin-right:var(--spacing-scale-half);margin-top:calc((var(--button-size) + var(--spacing-scale-half) + var(--spacing-scale-half)) * -1);transform:translateY(0)}brx-input[icon][density=small] brx-button[circle]{margin-top:calc((var(--button-size) + var(--spacing-scale-base)) * -1)}brx-input[icon][density=large] brx-button[circle]{margin-top:calc(var(--button-size) * -1)}brx-input[highlight]{--input-button-margin:var(--spacing-scale-2x);--input-padding:0 var(--spacing-scale-3x);--input-padding-button:var(--spacing-scale-7x);--input-padding-icon:var(--spacing-scale-7x);--input-size:var(--input-highlight)}brx-input[highlight] input{background-color:var(--gray-2);border-color:transparent;padding-left:var(--spacing-scale-3x);padding-right:var(--spacing-scale-3x)}brx-input[highlight] .brx-input-icon{margin-left:var(--spacing-scale-3x)}brx-input[highlight] .brx-input-icon+input{padding-left:var(--spacing-scale-7x)}brx-input .br-list{box-shadow:var(--surface-shadow-md);max-height:530px;overflow:auto;position:absolute;width:100%;z-index:var(--z-index-layer-2)}brx-input .br-list::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-input .br-list::-webkit-scrollbar-track{background:var(--gray-10)}brx-input .br-list::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-input .br-list:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}brx-input .br-list brx-item{--item-padding-y:var(--spacing-scale-2x)}brx-input .br-list brx-item:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-input .br-list brx-item:not(:first-child){border-top:var(--surface-width-sm) solid var(--border-color)}brx-input[color=success] input{border-color:var(--success);border-width:2px}brx-input[color=danger] input{border-color:var(--danger);border-width:2px}brx-input[color=warning] input{border-color:var(--warning);border-width:2px}brx-input[color=info] input{border-color:var(--info);border-width:2px}brx-input input:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-input input:focus,brx-input input:focus-visible,brx-input input.focus-visible{border-color:var(--focus) !important;box-shadow:0 0 0 var(--surface-width-md) var(--focus);outline:none}brx-input brx-message[variant=feedback]{margin-bottom:var(--spacing-scale-half)}brx-input[density=small]{--input-size:var(--input-small)}brx-input[density=medium]{--input-size:var(--input-medium)}brx-input[density=large]{--input-size:var(--input-large)}brx-input[dark-mode],brx-input[dark-mode] label{--color:var(--color-dark);--focus-color:var(--focus-color-dark)}";

const BrxInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxInput = createEvent(this, "brxInput", 7);
    this.brxChange = createEvent(this, "brxChange", 7);
    this.brxBlur = createEvent(this, "brxBlur", 7);
    this.brxFocus = createEvent(this, "brxFocus", 7);
    this.didBlurAfterEdit = false;
    this.onInput = (event) => {
      const oldValue = this.getValue();
      const newValue = this.nativeInput.value;
      this.nativeInput.value = oldValue;
      this.setValue(newValue);
      this.brxInput.emit(event);
    };
    this.onBlur = () => {
      this.hasFocus = false;
      this.focusChanged();
      this.brxBlur.emit();
    };
    this.onFocus = () => {
      this.hasFocus = true;
      this.focusChanged();
      this.brxFocus.emit();
    };
    this.onKeydown = (ev) => {
      if (this.shouldClearOnEdit()) {
        // Did the input value change after it was blurred and edited?
        // Do not clear if user is hitting Enter to submit form
        if (this.didBlurAfterEdit && this.hasValue() && ev.key !== 'Enter') {
          // Clear the input
          this.clearTextInput();
        }
        // Reset the flag
        this.didBlurAfterEdit = false;
      }
    };
    this.clearTextInput = (event) => {
      if (this.clearInput && !this.readonly && !this.disabled && event) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.setValue('');
    };
    this.value = undefined;
    this.controlledValue = TOKEN_UNCONTROLLED;
    this.currentValue = undefined;
    this.hasFocus = false;
    this.accept = undefined;
    this.autocapitalize = 'off';
    this.autocomplete = 'off';
    this.autocorrect = 'off';
    this.autofocus = false;
    this.clearInput = false;
    this.clearOnEdit = undefined;
    this.disabled = false;
    this.enterkeyhint = undefined;
    this.inputmode = undefined;
    this.max = undefined;
    this.maxlength = undefined;
    this.min = undefined;
    this.minlength = undefined;
    this.multiple = undefined;
    this.name = undefined;
    this.pattern = undefined;
    this.placeholder = undefined;
    this.readonly = false;
    this.required = false;
    this.spellcheck = false;
    this.step = undefined;
    this.size = undefined;
    this.type = 'text';
    this.label = undefined;
    this.hiddenLabel = undefined;
    this.labelClass = undefined;
    this.inline = undefined;
    this.inputId = undefined;
    this.density = undefined;
    this.startIconName = undefined;
    this.color = undefined;
    this.enablePasswordToggle = false;
    this.showPassword = false;
  }
  syncCurrentValueFromProps() {
    const targetValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
    this.currentValue = String(targetValue !== null && targetValue !== void 0 ? targetValue : '');
  }
  setValue(value) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = value;
    }
    this.brxChange.emit({ value });
  }
  /**
   * Sets focus on the specified `my-input`. Use this method instead of the global
   * `input.focus()`.
   */
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }
  /**
   * Returns the native `<input>` element used under the hood.
   */
  getInputElement() {
    return Promise.resolve(this.nativeInput);
  }
  async toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  setupShowPassword() {
    if (this.enablePasswordToggle) {
      this.showPassword = this.type === 'text';
    }
  }
  shouldClearOnEdit() {
    const { type, clearOnEdit } = this;
    return clearOnEdit === undefined ? type === 'password' : clearOnEdit;
  }
  getValue() {
    var _a;
    return String((_a = this.currentValue) !== null && _a !== void 0 ? _a : '');
  }
  focusChanged() {
    // If clearOnEdit is enabled and the input blurred but has a value, set a flag
    if (!this.hasFocus && this.shouldClearOnEdit() && this.hasValue()) {
      this.didBlurAfterEdit = true;
    }
  }
  hasValue() {
    return this.getValue().length > 0;
  }
  get inheritedAttributes() {
    return inheritAriaAttributes(this.el);
  }
  componentWillLoad() {
    if (!this.inputId) {
      this.inputId = generateUniqueId();
    }
    this.syncCurrentValueFromProps();
    // If the my-input has a tabindex attribute we get the value
    // and pass it down to the native input, then remove it from the
    // my-input to avoid causing tabbing twice on the same element
    if (this.el.hasAttribute('tabindex')) {
      const tabindex = this.el.getAttribute('tabindex');
      this.tabindex = tabindex !== null ? tabindex : undefined;
      this.el.removeAttribute('tabindex');
    }
  }
  render() {
    const { disabled, hiddenLabel, labelClass, startIconName, inputId, enablePasswordToggle, showPassword, inheritedAttributes } = this;
    const value = this.getValue();
    const labelId = inputId + '-lbl';
    const type = enablePasswordToggle ? (showPassword ? 'text' : 'password') : this.type;
    return (h(Host, { "aria-disabled": disabled ? 'true' : null }, h("div", { class: "brx-input-label" }, h("label", { class: `${hiddenLabel ? 'sr-only' : ''} ${labelClass}`, id: labelId, htmlFor: this.inputId }, this.label)), h("div", { class: "brx-input-content" }, h("div", { class: "brx-input-group" }, startIconName && (h("div", { class: "brx-input-icon" }, h("brx-icon", { name: startIconName }))), h("input", Object.assign({ type: type, id: inputId, value: value, min: this.min, max: this.max, step: this.step, size: this.size, name: this.name, disabled: disabled, accept: this.accept, pattern: this.pattern, tabindex: this.tabindex, multiple: this.multiple, readOnly: this.readonly, required: this.required, "aria-labelledby": labelId, minLength: this.minlength, maxLength: this.maxlength, inputMode: this.inputmode, autoFocus: this.autofocus, autoCorrect: this.autocorrect, autoComplete: this.autocomplete, enterKeyHint: this.enterkeyhint, autoCapitalize: this.autocapitalize, placeholder: this.placeholder || '', spellcheck: this.spellcheck ? 'true' : undefined, onBlur: this.onBlur, onInput: this.onInput, onFocus: this.onFocus, onKeyDown: this.onKeydown, ref: input => void (this.nativeInput = input) }, inheritedAttributes)), this.clearInput && !this.readonly && !this.disabled && (h("button", { type: "button", tabindex: "-1", onClick: this.clearTextInput, onMouseDown: this.clearTextInput, onTouchStart: this.clearTextInput, onPointerDown: event => void event.preventDefault() }, h("brx-icon", { name: "fa5/fas/times" }))), enablePasswordToggle && (h(Fragment, null, h("brx-button", { size: "small", "aria-label": "Mostrar senha", onClick: () => this.toggleShowPassword() }, h("brx-icon", { name: showPassword ? 'fa5/fas/eye-slash' : 'fa5/fas/eye' }))))), h("slot", { name: 'end-button' })), h("slot", { name: "helper" }), h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["syncCurrentValueFromProps"],
    "controlledValue": ["syncCurrentValueFromProps"],
    "enablePasswordToggle": ["setupShowPassword"]
  }; }
};
BrxInput.style = brxInputCss;

export { BrxInput as brx_input };
