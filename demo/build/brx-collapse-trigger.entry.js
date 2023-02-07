import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { b as findTarget, a as generateUniqueId } from './helpers-da43c71e.js';

const brxCollapseTriggerCss = "brx-collapse-trigger{display:block}";

const BrxCollapseTrigger = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxTriggerClick = createEvent(this, "brxTriggerClick", 7);
    this.brxSetTargetVisibilityStatus = createEvent(this, "brxSetTargetVisibilityStatus", 7);
    this.useIcons = true;
    this.breakpoint = undefined;
    this.iconToHide = 'fa5/fas/chevron-up';
    this.iconToShow = 'fa5/fas/chevron-down';
    this.target = undefined;
    this.triggerEl = undefined;
    this.targetEl = undefined;
  }
  get isOpen() {
    var _a;
    return !((_a = this.targetEl) === null || _a === void 0 ? void 0 : _a.hasAttribute('hidden'));
  }
  setupElements() {
    this.triggerEl = this.el;
    this.targetEl = findTarget(this.target);
  }
  // TODO: Melhorar a solução
  _checkBreakpoint() {
    const { targetEl, breakpoint } = this;
    if (targetEl && breakpoint) {
      if (window.matchMedia('(min-width: 977px)').matches) {
        targetEl.removeAttribute('hidden');
      }
    }
  }
  async setup() {
    this.setupElements();
    this._setVisibilityStatus();
    if (this.useIcons) {
      this._toggleIcon();
    }
    const { triggerEl, targetEl } = this;
    if (triggerEl && targetEl) {
      if (!triggerEl.hasAttribute('aria-controls')) {
        if (!targetEl.id) {
          targetEl.id = generateUniqueId();
        }
        triggerEl.setAttribute('aria-controls', targetEl.id);
      }
    }
    this._checkBreakpoint();
  }
  _setVisibilityStatus() {
    this._setTriggerVisibilityStatus();
    this._setTargetVisibilityStatus();
  }
  _setTriggerVisibilityStatus() {
    const { targetEl, triggerEl } = this;
    if (targetEl) {
      const isTargetHidden = targetEl.hasAttribute('hidden');
      triggerEl.setAttribute('data-visible', String(!isTargetHidden));
      triggerEl.setAttribute('aria-expanded', String(!isTargetHidden));
    }
  }
  _setTargetVisibilityStatus() {
    const { targetEl } = this;
    if (targetEl) {
      const isTargetHidden = targetEl.hasAttribute('hidden');
      targetEl.setAttribute('aria-hidden', String(isTargetHidden));
      this.brxSetTargetVisibilityStatus.emit();
    }
  }
  _handleTriggerClickBehavior() {
    const { breakpoint } = this;
    const canChange = !breakpoint || window.matchMedia('(max-width: 977px)').matches;
    if (canChange) {
      this._toggleVisibility();
      if (this.useIcons) {
        this._toggleIcon();
      }
    }
  }
  emitChange() {
    const { triggerEl } = this;
    if (triggerEl) {
      triggerEl.dispatchEvent(new window.Event('change'));
      this.brxTriggerClick.emit();
    }
  }
  async open(emitEvent = true) {
    const { targetEl } = this;
    if (targetEl) {
      this.targetEl.removeAttribute('hidden');
      this._setVisibilityStatus();
      emitEvent && this.emitChange();
    }
  }
  async close(emitEvent = true) {
    const { targetEl } = this;
    if (targetEl) {
      this.targetEl.setAttribute('hidden', '');
      this._setVisibilityStatus();
      emitEvent && this.emitChange();
    }
  }
  _toggleVisibility(emitEvent = true) {
    if (this.isOpen) {
      this.close(emitEvent);
    }
    else {
      this.open(emitEvent);
    }
  }
  _toggleIcon() {
    const { targetEl, triggerEl, iconToShow, iconToHide } = this;
    if (targetEl) {
      const hidden = targetEl.hasAttribute('hidden');
      const icons = Array.from(triggerEl.querySelectorAll('brx-icon[data-collapse-icon]'));
      for (const icon of icons) {
        icon.name = hidden ? iconToShow : iconToHide;
      }
    }
  }
  handleClick() {
    this._handleTriggerClickBehavior();
  }
  async getTrigger() {
    return this.triggerEl;
  }
  async getTarget() {
    return this.targetEl;
  }
  async getIsOpen() {
    return this.isOpen;
  }
  componentWillLoad() {
    this.setupElements();
    this.setup();
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "target": ["setupElements"]
  }; }
};
BrxCollapseTrigger.style = brxCollapseTriggerCss;

export { BrxCollapseTrigger as brx_collapse_trigger };
