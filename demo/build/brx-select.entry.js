import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { T as TOKEN_UNCONTROLLED } from './tokens-3a672c03.js';
import { c as castArray, f as findTargets, b as findTarget, d as toggleItem, m as minmax, a as generateUniqueId } from './helpers-da43c71e.js';

const DEFAULT_NOT_FOUND_IMAGE = `data:image/png;base64,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`;
const mountSelectInputContent = (input, labels) => {
  if (labels.length === 0 || !input) {
    return '';
  }
  const GAP = 0.4;
  let amount = 1;
  let value = labels.toString().replaceAll(',', ', ');
  const tempSpan = document.createElement('span');
  tempSpan.innerHTML = value;
  document.querySelector('body').insertAdjacentElement('beforeend', tempSpan);
  while (tempSpan.offsetWidth > input.offsetWidth - input.offsetWidth * GAP) {
    value = labels
      .slice(0, labels.length - amount)
      .toString()
      .replaceAll(',', ', ')
      .concat(` + (${amount})`);
    tempSpan.innerHTML = value;
    amount++;
  }
  tempSpan.remove();
  return value;
};

const brxSelectCss = "brx-select{--select-divider:1px solid var(--color-secondary-04);--select-shadow:var(--surface-shadow-md);display:block;max-width:400px;min-width:100px;position:relative}brx-select .brx-select-options{background:var(--bg-color);box-shadow:var(--select-shadow);display:none;margin-top:-2px;max-height:404px;overflow:auto;position:absolute;resize:none;width:100%;z-index:1}brx-select .brx-select-options::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-select .brx-select-options::-webkit-scrollbar-track{background:var(--gray-10)}brx-select .brx-select-options::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-select .brx-select-options:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}brx-select .brx-select-options:focus,brx-select .brx-select-options:active{color:var(--color-secondary-09);outline:none}brx-select .brx-select-options:hover::-webkit-scrollbar-thumb{background:var(--color-secondary-07)}brx-select .brx-select-options brx-select-option:not(:last-child) brx-item{border-bottom:var(--select-divider)}brx-select .brx-select-options brx-select-option brx-item{--color:var(--color-light);--color-rgb:var(--color-light-rgb);--text-color:var(--color);--interactive:var(--interactive-light);--interactive-rgb:var(--interactive-light-rgb);--visited:var(--visited-light);--hover:var(--hover-light);--pressed:var(--pressed-light);--focus-color:var(--focus-color-light);--focus:var(--focus-color);--item-padding-y:var(--spacing-scale-2x)}brx-select .brx-select-options brx-select-option brx-item .content{padding:0}brx-select .brx-select-options brx-select-option brx-item brx-checkbox,brx-select .brx-select-options brx-select-option brx-item brx-radio{--item-padding-x:var(--spacing-scale-2x);--item-padding-y:var(--spacing-scale-2x)}brx-select .brx-select-options brx-select-option brx-item brx-checkbox input:hover:not(:disabled)+label::before,brx-select .brx-select-options brx-select-option brx-item brx-radio input:hover:not(:disabled)+label::before{background-image:none}brx-select .brx-select-options brx-select-option brx-item brx-checkbox input+label,brx-select .brx-select-options brx-select-option brx-item brx-radio input+label{padding-left:calc(var(--checkbox-padding) + var(--checkbox-size) + var(--item-padding-x))}brx-select .brx-select-options brx-select-option brx-item brx-radio input+label,brx-select .brx-select-options brx-select-option brx-item brx-radio input:checked+label{color:var(--text-color);display:block;height:auto;min-height:0;padding:var(--item-padding)}brx-select .brx-select-options brx-select-option brx-item brx-radio input+label::before,brx-select .brx-select-options brx-select-option brx-item brx-radio input+label::after,brx-select .brx-select-options brx-select-option brx-item brx-radio input:checked+label::before,brx-select .brx-select-options brx-select-option brx-item brx-radio input:checked+label::after{display:none;content:none}brx-select .brx-select-options brx-select-option brx-item:not([disabled]){--focus-offset:calc(var(--spacing-scale-half) * -1)}brx-select .brx-select-options brx-select-option brx-item:not([disabled]):focus{outline:none}brx-select .brx-select-options brx-select-option brx-item:not([disabled]).focus-visible,brx-select .brx-select-options brx-select-option brx-item:not([disabled]):focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-select .brx-select-options brx-select-option brx-item:not([disabled]):not([data-disable-hover-interaction]):not(:disabled):hover{background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-select .brx-select-options brx-select-option brx-item[selected]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-select .brx-select-options brx-select-option brx-item[selected]:focus{outline:none}brx-select .brx-select-options brx-select-option brx-item[selected].focus-visible,brx-select .brx-select-options brx-select-option brx-item[selected]:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-select .brx-select-options brx-select-option brx-item[selected]:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-select .brx-select-options brx-select-option brx-item[disabled]{line-height:calc(var(--font-line-height-high) * 2);padding-left:calc(var(--item-padding) + var(--spacing-scale-base))}brx-select[expanded] .brx-select-options,brx-select .brx-select-options[data-select-expanded]{display:block}brx-select brx-select-option[highlighted] brx-item{background-color:var(--gray-2);padding-bottom:var(--spacing-scale-base);padding-top:var(--spacing-scale-base)}brx-select brx-select-option[highlighted] brx-item brx-checkbox label,brx-select brx-select-option[highlighted] brx-item brx-radio label{font-weight:var(--font-weight-semi-bold)}brx-select brx-select-option[highlighted] brx-item brx-checkbox:hover,brx-select brx-select-option[highlighted] brx-item brx-radio:hover{background:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-select brx-select-option[highlighted] brx-item brx-checkbox:hover label,brx-select brx-select-option[highlighted] brx-item brx-radio:hover label{color:var(--text-color)}brx-select brx-select-option[highlighted] brx-item[selected]{background-color:var(--selected)}brx-select[dark-mode],brx-select[dark-mode] label{--color:var(--color-dark);--focus-color:var(--focus-color-dark)}";

const DOMStrings = {
  toggle: 'brx-select-toggle',
  brxInput: '[data-select-input]',
  brxInputNative: '[data-select-input] input',
  option: 'brx-select-option',
  optionsList: '.brx-select-options',
  optionToggleAll: '[data-select-toggle-all]',
};
const BrxSelect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxChange = createEvent(this, "brxChange", 7);
    this.brxFilterInputChange = createEvent(this, "brxFilterInputChange", 7);
    this.darkMode = false;
    this.hideSearchIcon = false;
    this.placeholder = undefined;
    this.name = undefined;
    this.nativeSelect = null;
    this.label = undefined;
    this.inputId = undefined;
    this.multiple = false;
    this.expanded = false;
    this.showFeedbackNotFound = false;
    this.disableToggleAll = false;
    this.selectAllLabel = 'Selecionar Todos';
    this.unselectAllLabel = 'Deselecionar Todos';
    this.value = [];
    this.controlledValue = TOKEN_UNCONTROLLED;
    this.currentValue = [];
  }
  get inputEl() {
    return this.el.querySelector(DOMStrings.brxInputNative);
  }
  get toggleEl() {
    return this.el.querySelector(DOMStrings.toggle);
  }
  get optionsListEl() {
    return this.el.querySelector(DOMStrings.optionsList);
  }
  syncCurrentValueFromProps() {
    const incomingValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
    this.currentValue = castArray(incomingValue !== null && incomingValue !== void 0 ? incomingValue : []);
  }
  get definedOptions() {
    return this.allOptions.filter(option => !option.matches(DOMStrings.optionToggleAll));
  }
  get allOptions() {
    return findTargets(DOMStrings.option, this.el);
  }
  get focusedOption() {
    var _a;
    return (_a = this.allOptions[this.focusedOptionIndex]) !== null && _a !== void 0 ? _a : null;
  }
  get focusedOptionIndex() {
    return this.allOptions.findIndex(option => option.contains(document.activeElement));
  }
  get currentValueLabels() {
    const currentValue = this.currentValue;
    return this.definedOptions
      .filter(option => currentValue.includes(option.value))
      .map(option => {
      const label = findTarget('label', option);
      return label === null || label === void 0 ? void 0 : label.innerText;
    });
  }
  get currentValueOptions() {
    return this.currentValue.map(value => this.definedOptions.find(option => option.value === value));
  }
  get inputPlaceholder() {
    var _a;
    return (_a = this.placeholder) !== null && _a !== void 0 ? _a : (this.multiple ? 'Selecione os itens.' : 'Selecione o item.');
  }
  get isToggleAllEnabled() {
    return this.multiple && !this.disableToggleAll;
  }
  get isAllSelected() {
    return this.definedOptions.length === this.currentValue.length;
  }
  get toggleAllLabel() {
    return this.isAllSelected ? this.unselectAllLabel : this.selectAllLabel;
  }
  set inputValue(value) {
    if (this.inputEl) {
      this.inputEl.value = value;
      if (value === null || value === '') {
        this.brxFilterInputChange.emit({ query: '' });
      }
    }
  }
  setValue(value) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = value;
    }
    this.brxChange.emit({ value });
  }
  changeValue(optionValue) {
    const currentValue = this.multiple ? this.currentValue : this.currentValue.filter(i => i === optionValue);
    this.setValue(toggleItem(currentValue, optionValue));
  }
  focusOption(option = null) {
    const item = option && findTarget('brx-item', option);
    if (item) {
      item.focus();
    }
  }
  selectAll() {
    this.setValue(this.definedOptions.map(option => option.value));
  }
  unselectAll() {
    this.setValue([]);
  }
  toggleAll() {
    if (this.isAllSelected) {
      this.unselectAll();
    }
    else {
      this.selectAll();
    }
  }
  openSelect() {
    this.expanded = true;
  }
  closeSelect() {
    this.expanded = false;
  }
  toggleExpanded() {
    this.expanded = !this.expanded;
  }
  setInput() {
    const currentValueLabels = this.currentValueLabels;
    const preview = this.multiple ? mountSelectInputContent(this.inputEl, currentValueLabels) : currentValueLabels[0];
    this.inputValue = preview !== null && preview !== void 0 ? preview : null;
  }
  resetInput() {
    this.inputValue = null;
  }
  resetVisible() {
    for (const option of this.allOptions) {
      option.visible = true;
    }
  }
  syncOptions() {
    for (const option of this.definedOptions) {
      option.multiple = this.multiple;
      option.checked = this.currentValue.includes(option.value);
    }
  }
  handleCurrentValueChange() {
    this.syncOptions();
    if (!this.multiple && this.expanded) {
      this.closeSelect();
    }
    this.setInput();
  }
  handleExpandedChange() {
    this.toggleEl.expanded = this.expanded;
    if (this.expanded) {
      this.optionsListEl.dataset.selectExpanded = '';
    }
    else {
      delete this.optionsListEl.dataset.selectExpanded;
    }
    if (this.expanded) {
      this.resetInput();
    }
    else {
      this.setInput();
    }
  }
  handleGlobalClick(event) {
    const target = event.target;
    if (!this.el.contains(target)) {
      this.closeSelect();
    }
  }
  handleToggleClick(event) {
    const target = event.target;
    const trigger = target.closest(DOMStrings.toggle);
    if (trigger) {
      this.toggleExpanded();
    }
  }
  handleInputFocus(event) {
    const target = event.target;
    const trigger = target.closest(DOMStrings.brxInput);
    if (trigger) {
      this.openSelect();
    }
  }
  async handleOptionChange(option, incomingDetail) {
    const isToggleAll = option.closest(DOMStrings.optionToggleAll);
    const { value, checked } = incomingDetail;
    if (isToggleAll) {
      if (checked) {
        this.selectAll();
      }
      else {
        this.unselectAll();
      }
    }
    else {
      this.changeValue(value);
    }
  }
  handleOptionChangeEvent(event) {
    const target = event.target;
    const option = target.closest(DOMStrings.option);
    this.handleOptionChange(option, event.detail);
  }
  handleInputChange(event) {
    const target = event.target;
    const brxInput = target.closest('brx-input');
    if (brxInput) {
      const detail = event.detail;
      this.brxFilterInputChange.emit({ query: String(detail.value) });
    }
  }
  getRotatedFocusedOptionIndex(direction) {
    return minmax(this.focusedOptionIndex + direction, 0, this.allOptions.length - 1);
  }
  getRotatedFocusedOption(direction) {
    const targetIndex = this.getRotatedFocusedOptionIndex(direction);
    return this.allOptions[targetIndex];
  }
  rotateOptionFocus(direction) {
    this.focusOption(this.getRotatedFocusedOption(direction));
  }
  handleKeydownOnInput(event) {
    switch (event.key) {
      case 'Tab': {
        if (event.shiftKey) {
          this.closeSelect();
        }
        else {
          this.toggleEl.focus();
        }
        break;
      }
      default: {
        break;
      }
    }
    if (event.code === 'ArrowDown') {
      event.preventDefault();
      this.rotateOptionFocus(1);
    }
  }
  /**
   * Define comportamentos de teclado no option
   */
  async setKeyboardClickOnActiveOption() {
    const option = this.focusedOption;
    option.toggleChecked();
  }
  handleKeydownOnList(event) {
    const handledCodes = ['Tab', 'Escape', 'Space', 'ArrowUp', 'ArrowDown'];
    if (handledCodes.includes(event.code)) {
      event.preventDefault();
    }
    switch (event.code) {
      case 'Tab': {
        this.closeSelect();
        break;
      }
      case 'Escape': {
        this.closeSelect();
        break;
      }
      case 'Space': {
        this.setKeyboardClickOnActiveOption();
        break;
      }
      case 'ArrowUp': {
        this.rotateOptionFocus(-1);
        break;
      }
      case 'ArrowDown': {
        this.rotateOptionFocus(1);
        break;
      }
      default: {
        break;
      }
    }
  }
  handleKeydownEvent(event) {
    const target = event.target;
    if (target.closest('brx-input')) {
      this.handleKeydownOnInput(event);
    }
    if (target.closest('.brx-select-options')) {
      this.handleKeydownOnList(event);
    }
  }
  componentWillLoad() {
    if (!this.inputId) {
      this.inputId = generateUniqueId();
    }
    this.syncCurrentValueFromProps();
  }
  componentDidLoad() {
    this.setInput();
  }
  get isNativeSelectEnabled() {
    var _a;
    return (_a = this.nativeSelect) !== null && _a !== void 0 ? _a : typeof this.name === 'string';
  }
  render() {
    return (h(Host, null, h("brx-input", { type: "text", label: this.label, "data-select-input": true, placeholder: this.inputPlaceholder, "start-icon-name": this.hideSearchIcon ? undefined : 'fa5/fas/search' }, h("brx-select-toggle", { slot: "end-button" })), h("div", { tabindex: "0", class: "brx-select-options" }, this.isToggleAllEnabled && h("brx-select-option", { "data-select-toggle-all": true, highlighted: true, multiple: true, checked: this.isAllSelected, label: this.toggleAllLabel }), h("slot", null), this.showFeedbackNotFound && (h("slot", { name: "not-found" }, h("div", { class: "br-item not-found" }, h("div", { class: "container pl-0 pr-0" }, h("div", { class: "row" }, h("div", { class: "col-auto" }, h("img", { src: DEFAULT_NOT_FOUND_IMAGE })), h("div", { class: "col" }, h("p", null, h("strong", null, "Ops!"), " N\u00E3o encontramos o que voc\u00EA est\u00E1 procurando!"))))))), h("div", { class: 'd-none' }, this.isNativeSelectEnabled && (h("select", { name: this.name }, this.definedOptions.map(option => {
      var _a;
      return (h("option", { key: option.value, value: option.value }, (_a = option.label) !== null && _a !== void 0 ? _a : option.value));
    })))))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["syncCurrentValueFromProps"],
    "controlledValue": ["syncCurrentValueFromProps"],
    "currentValue": ["handleCurrentValueChange"],
    "expanded": ["handleExpandedChange"]
  }; }
};
BrxSelect.style = brxSelectCss;

export { BrxSelect as brx_select };
