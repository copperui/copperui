import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';
import { g as getCollapseTriggerProps } from './brx-collapse-trigger-interface-50a2b194.js';

const brxDropdownTriggerCss = "brx-dropdown-trigger{display:inline-block}";

const BrxDropdownTrigger = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.useIcons = true;
    this.breakpoint = undefined;
    this.iconToHide = 'fa5/fas/chevron-up';
    this.iconToShow = 'fa5/fas/chevron-down';
    this.target = undefined;
    this.dropdown = undefined;
  }
  async handleDropdown(event) {
    const evTargetEl = event.target;
    if (this.collapseTriggerEl) {
      const collapseTargetEl = await this.collapseTriggerEl.getTarget();
      const collapseTriggerEl = await this.collapseTriggerEl.getTrigger();
      if (!collapseTriggerEl.contains(evTargetEl) && !collapseTargetEl.hasAttribute('hidden') && !collapseTargetEl.contains(evTargetEl)) {
        collapseTriggerEl.click();
      }
    }
  }
  async setTargetVisibilityStatus() {
    const target = await this.collapseTriggerEl.getTarget();
    if (target.hasAttribute('hidden')) {
      target.removeAttribute('data-dropdown');
    }
    else {
      target.setAttribute('data-dropdown', '');
    }
  }
  async setParentsTargetVisibilityStatus() {
    const target = await this.collapseTriggerEl.getTarget();
    this.dropdown = !target.hasAttribute('hidden');
  }
  handleTriggerClickBehavior() {
    this.setParentsTargetVisibilityStatus();
  }
  render() {
    const collapseTriggerProps = getCollapseTriggerProps(this);
    return (h(Host, null, h("brx-collapse-trigger", Object.assign({}, collapseTriggerProps, { ref: el => void (this.collapseTriggerEl = el), onBrxTriggerClick: () => this.handleTriggerClickBehavior(), onBrxSetTargetVisibilityStatus: () => this.setTargetVisibilityStatus() }), h("slot", null))));
  }
};
BrxDropdownTrigger.style = brxDropdownTriggerCss;

export { BrxDropdownTrigger as brx_dropdown_trigger };
