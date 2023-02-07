import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { a as generateUniqueId } from './helpers-da43c71e.js';

const brxSelectOptionCss = ":host{display:block}";

const BrxSelectOption = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxSelectOptionChange = createEvent(this, "brxSelectOptionChange", 7);
    this.label = undefined;
    this.inputId = undefined;
    this.multiple = false;
    this.highlighted = false;
    this.value = undefined;
    this.checked = false;
    this.visible = true;
  }
  changeChecked(checked) {
    const { value } = this;
    if (checked !== this.checked) {
      this.brxSelectOptionChange.emit({ value, checked });
    }
  }
  toggleChecked() {
    this.changeChecked(!this.checked);
    return Promise.resolve();
  }
  componentWillLoad() {
    if (!this.inputId) {
      this.inputId = generateUniqueId();
    }
  }
  handleBrxChange(event) {
    const target = event.target;
    const trigger = target.closest('brx-select, brx-radio');
    if (trigger) {
      const detail = event.detail;
      this.changeChecked(detail.checked);
    }
  }
  handleClick(event) {
    const target = event.target;
    if (target === this.el) {
      this.toggleChecked();
    }
  }
  get brxInputAttributes() {
    const { label, inputId, checked, value } = this;
    return {
      label,
      value,
      inputId,
      controlledChecked: checked,
    };
  }
  render() {
    const { visible, brxInputAttributes } = this;
    return (h(Host, { class: !visible ? 'd-none' : '' }, h("brx-item", { tabindex: "-1", "data-toggle": "selection" }, this.multiple ? h("brx-checkbox", Object.assign({}, brxInputAttributes)) : h("brx-radio", Object.assign({}, brxInputAttributes)), h("slot", null))));
  }
  get el() { return getElement(this); }
};
BrxSelectOption.style = brxSelectOptionCss;

export { BrxSelectOption as brx_select_option };
