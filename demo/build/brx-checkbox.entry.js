import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { T as TOKEN_UNCONTROLLED } from './tokens-3a672c03.js';
import { f as findTargets, a as generateUniqueId } from './helpers-da43c71e.js';

const brxCheckboxCss = "brx-checkbox{display:block;--checkbox-padding:var(--spacing-scale-base);--checkbox-size:24px;display:flex}brx-checkbox+brx-checkbox{margin-top:var(--spacing-scale-base)}brx-checkbox input{margin:0;opacity:0;position:absolute}brx-checkbox input+label{cursor:pointer;display:flex;align-items:center;margin-bottom:0;min-height:var(--checkbox-size);min-width:var(--checkbox-size);padding-left:calc(var(--spacing-scale-base) + var(--checkbox-size));position:relative}brx-checkbox input+label::before{background:var(--background-light);border:1px solid var(--border-color);border-radius:4px;content:\"\";height:var(--checkbox-size);left:0;position:absolute;width:var(--checkbox-size)}brx-checkbox input+label:empty{padding:0}brx-checkbox label{font-weight:var(--font-weight-medium)}brx-checkbox[hidden-label] label{padding-left:calc(var(--checkbox-size) + var(--surface-width-md) * 2);text-indent:-10000px;white-space:nowrap;width:0}brx-checkbox[data-checked] input+label::after{border:solid var(--selected);border-width:0 3px 3px 0;content:\"\";height:var(--icon-size-sm);left:8px;position:absolute;top:4px;transform:rotate(45deg);width:8px}brx-checkbox[data-indeterminate] input+label::before{--interactive-rgb:var(--color-rgb);background:var(--selected);border-color:var(--selected)}brx-checkbox[data-indeterminate] input:hover:not(:disabled)+label::before{--interactive-rgb:var(--color-dark-rgb)}brx-checkbox[data-indeterminate][data-checked] input+label::after{border-color:var(--background-light);border-width:0 0 3px;top:2px;transform:none}brx-checkbox[invalid] input:focus-visible+label::before,brx-checkbox[invalid][focus-visible] input+label::before,brx-checkbox[invalid][data-checked] input:focus-visible+label::before,brx-checkbox[invalid][data-checked][focus-visible] input+label::before,brx-checkbox[state~=invalid] input:focus-visible+label::before,brx-checkbox[state~=invalid][focus-visible] input+label::before,brx-checkbox[state~=invalid][data-checked] input:focus-visible+label::before,brx-checkbox[state~=invalid][data-checked][focus-visible] input+label::before{--border-color:var(--focus-color)}brx-checkbox[invalid][data-checked] input+label::before,brx-checkbox[state~=invalid][data-checked] input+label::before{--border-color:var(--danger)}brx-checkbox[invalid] input+label::before,brx-checkbox[state~=invalid] input+label::before{--border-color:var(--danger)}brx-checkbox[valid] input:focus-visible+label::before,brx-checkbox[valid][focus-visible] input+label::before,brx-checkbox[valid][data-checked] input:focus-visible+label::before,brx-checkbox[valid][data-checked][focus-visible] input+label::before,brx-checkbox[state~=valid] input:focus-visible+label::before,brx-checkbox[state~=valid][focus-visible] input+label::before,brx-checkbox[state~=valid][data-checked] input:focus-visible+label::before,brx-checkbox[state~=valid][data-checked][focus-visible] input+label::before{--border-color:var(--focus-color)}brx-checkbox[valid][data-checked] input+label::before,brx-checkbox[state~=valid][data-checked] input+label::before{--border-color:var(--success)}brx-checkbox[valid] input+label::before,brx-checkbox[state~=valid] input+label::before{--border-color:var(--success)}brx-checkbox[size=small] input+label{line-height:var(--spacing-scale-2xh);min-height:var(--spacing-scale-2xh)}brx-checkbox[size=small] input+label::before{height:var(--spacing-scale-2xh);width:var(--spacing-scale-2xh)}brx-checkbox[size=small][data-checked] input+label::after{border-width:0 2px 2px 0;height:var(--icon-size-sm);left:7px;top:6px;width:6px}brx-checkbox[size=small][data-checked][data-indeterminate] input+label::after{border-color:var(--background-light);border-width:0 0 3px;top:2px;transform:none}brx-checkbox input:focus-visible+label::before,brx-checkbox[focus-visible] input+label::before,brx-checkbox[data-checked] input:focus-visible+label::before,brx-checkbox[data-checked][focus-visible] input+label::before{border-color:var(--focus) !important;box-shadow:0 0 0 var(--surface-width-md) var(--focus);outline:none}brx-checkbox input:invalid+label::before{--border-color:var(--danger)}brx-checkbox input:hover:not(:disabled)+label::before{--interactive-rgb:var(--interactive-light-rgb);background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-checkbox:not(:is([disabled],:disabled)) input:disabled+label{cursor:not-allowed;opacity:var(--disabled)}brx-checkbox:not(:is([disabled],:disabled)) input:disabled+label *{pointer-events:none}brx-checkbox.inverted,brx-checkbox.inverted label,brx-checkbox.dark-mode,brx-checkbox.dark-mode label,brx-checkbox[dark-mode],brx-checkbox[dark-mode] label{color:var(--color-dark)}";

const BrxCheckbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxChange = createEvent(this, "brxChange", 7);
    this.brxUpdate = createEvent(this, "brxUpdate", 7);
    this.brxFocus = createEvent(this, "brxFocus", 7);
    this.brxBlur = createEvent(this, "brxBlur", 7);
    this.syncInProgress = false;
    this.onChange = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const target = event.target;
      target.checked = this.currentChecked;
      this.setFocus();
      this.setState(!this.currentChecked, false);
    };
    this.onBlur = () => {
      this.brxBlur.emit();
    };
    this.onFocus = () => {
      this.brxFocus.emit();
    };
    this.label = undefined;
    this.name = undefined;
    this.checked = null;
    this.controlledChecked = TOKEN_UNCONTROLLED;
    this.indeterminate = false;
    this.currentChecked = false;
    this.currentIndeterminate = false;
    this.disabled = false;
    this.size = 'medium';
    this.valid = undefined;
    this.danger = undefined;
    this.invalid = undefined;
    this.state = undefined;
    this.darkMode = false;
    this.hiddenLabel = false;
    this.inputId = undefined;
    this.value = 'on';
    this.child = undefined;
    this.propParent = undefined;
    this.checkAllLabel = 'Selecionar tudo';
    this.uncheckAllLabel = 'Desselecionar tudo';
  }
  emitUpdateEvent() {
    const value = this.value;
    const checked = this.currentChecked;
    const indeterminate = this.currentIndeterminate;
    this.brxUpdate.emit({ checked, indeterminate, value });
  }
  emitChangeEvent(checked = this.currentChecked, indeterminate = this.currentIndeterminate) {
    const { value } = this;
    this.brxChange.emit({ checked, indeterminate, value });
  }
  syncCurrentChecked() {
    this.currentChecked = this.controlledChecked !== TOKEN_UNCONTROLLED ? this.controlledChecked : this.checked;
  }
  syncCurrentIndeterminate() {
    this.currentIndeterminate = this.indeterminate;
  }
  syncCurrent() {
    this.syncCurrentChecked();
    this.syncCurrentIndeterminate();
  }
  async getCurrentState() {
    return {
      value: this.value,
      checked: this.currentChecked,
      indeterminate: this.currentIndeterminate,
    };
  }
  setState(checked, indeterminate) {
    if (this.controlledChecked === TOKEN_UNCONTROLLED) {
      this.currentChecked = checked;
      this.currentIndeterminate = indeterminate;
    }
    this.emitChangeEvent(checked, indeterminate);
    return Promise.resolve();
  }
  get parent() {
    const { propParent: _parent } = this;
    return _parent === '' ? true : _parent;
  }
  get isParent() {
    return !!this.parent;
  }
  get isChild() {
    return !!this.child;
  }
  getCheckgroupChildren() {
    var _a;
    const parent = this.parent;
    if (parent) {
      const documentChildren = typeof parent === 'string' ? findTargets(`brx-checkbox[child="${parent}"]`) : [];
      const parentGroup = this.el.closest('brx-checkgroup');
      const parentGroupAllCheckboxes = Array.from((_a = parentGroup === null || parentGroup === void 0 ? void 0 : parentGroup.querySelectorAll('brx-checkbox')) !== null && _a !== void 0 ? _a : []);
      const observableCheckboxes = parentGroupAllCheckboxes
        .filter(checkbox => checkbox !== this.el)
        .filter(checkbox => {
        const groupLevel1 = checkbox.closest('brx-checkgroup');
        const groupLevel2 = groupLevel1.parentElement.closest('brx-checkgroup');
        return groupLevel1 === parentGroup || groupLevel2 === parentGroup;
      });
      return [...documentChildren, ...observableCheckboxes];
    }
    return [];
  }
  async getCheckgroupState() {
    const allStates = await Promise.all(this.getCheckgroupChildren().map(i => i.getCurrentState()));
    const currentStates = new Set(allStates.map(state => (state.indeterminate ? 'indeterminate' : state.checked ? 'checked' : 'unchecked')));
    const isChecked = currentStates.has('checked') || currentStates.has('indeterminate');
    const isIndeterminate = currentStates.size > 1;
    const status = isIndeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked';
    return { status, isChecked, isIndeterminate };
  }
  syncCheckgroupParent() {
    if (this.syncInProgress || !this.isParent) {
      return;
    }
    this.syncInProgress = true;
    this.getCheckgroupState().then(({ isChecked, isIndeterminate }) => {
      this.setState(isChecked, isIndeterminate);
      this.syncInProgress = false;
    });
  }
  syncCheckgroupChilds() {
    if (this.syncInProgress || !this.isParent) {
      return;
    }
    this.syncInProgress = true;
    if (!this.currentIndeterminate) {
      const children = this.getCheckgroupChildren();
      for (const checkbox of children) {
        checkbox.setState(this.currentChecked, false);
      }
    }
    this.syncInProgress = false;
  }
  checkIsCheckboxParentChild(checkbox) {
    const children = this.getCheckgroupChildren();
    return children.includes(checkbox);
  }
  handleGlobalChange(event) {
    const target = event.target;
    const checkbox = target === null || target === void 0 ? void 0 : target.closest('brx-checkbox');
    if (checkbox) {
      const isChildCheckbox = this.checkIsCheckboxParentChild(checkbox);
      if (isChildCheckbox) {
        this.syncCheckgroupParent();
      }
      else if (checkbox === this.el) {
        this.syncCheckgroupChilds();
      }
    }
  }
  async getNativeChecked() {
    var _a;
    return (_a = this.nativeInput) === null || _a === void 0 ? void 0 : _a.checked;
  }
  componentWillLoad() {
    if (this.inputId === undefined) {
      this.inputId = generateUniqueId();
    }
    this.syncCurrent();
    if (this.isParent) {
      this.syncCheckgroupParent();
    }
  }
  setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }
  get labelText() {
    if (this.parent) {
      if (this.currentChecked && !this.currentIndeterminate) {
        return this.uncheckAllLabel;
      }
      else {
        return this.checkAllLabel;
      }
    }
    return this.label;
  }
  render() {
    var _a;
    return (h(Host, { role: "checkbox", "data-checked": this.currentChecked, "aria-checked": `${this.currentChecked}`, "aria-hidden": this.disabled ? 'true' : null, "data-indeterminate": this.currentIndeterminate }, h("input", { type: "checkbox", id: this.inputId, disabled: this.disabled, checked: this.currentChecked, name: (_a = this.name) !== null && _a !== void 0 ? _a : this.inputId, indeterminate: this.currentIndeterminate, "aria-checked": `${this.currentChecked}`, onChange: this.onChange, onBlur: () => this.onBlur(), onFocus: () => this.onFocus(), ref: focusEl => (this.nativeInput = focusEl) }), h("label", { htmlFor: this.inputId }, this.labelText), h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["emitUpdateEvent", "emitChangeEvent"],
    "currentChecked": ["emitUpdateEvent", "emitChangeEvent"],
    "currentIndeterminate": ["emitUpdateEvent", "emitChangeEvent"],
    "checked": ["syncCurrentChecked"],
    "controlledChecked": ["syncCurrentChecked"],
    "indeterminate": ["syncCurrentIndeterminate"]
  }; }
};
BrxCheckbox.style = brxCheckboxCss;

export { BrxCheckbox as brx_checkbox };
