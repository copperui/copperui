import { r as registerInstance, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { f as findTargets } from './helpers-da43c71e.js';
import { g as getCollapseTriggerProps } from './brx-collapse-trigger-interface-50a2b194.js';

const brxAccordionTriggerCss = "brx-accordion-trigger{display:block}";

const BrxAccordionTrigger = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.useIcons = true;
    this.breakpoint = undefined;
    this.iconToHide = 'fa5/fas/chevron-up';
    this.iconToShow = 'fa5/fas/chevron-down';
    this.target = undefined;
    this.group = undefined;
  }
  getGroupAccordionTriggers() {
    return findTargets(`brx-accordion-trigger[group="${this.group}"]`);
  }
  getOtherGroupAccordionTriggers() {
    const groupAccordions = this.getGroupAccordionTriggers();
    return groupAccordions.filter(i => i !== this.el);
  }
  async closeOtherAccordionTriggers() {
    const otherAccordions = this.getOtherGroupAccordionTriggers();
    for (const accordion of otherAccordions) {
      await accordion.close();
    }
  }
  async handleClick() {
    const isOpen = await this.collapseTriggerEl.getIsOpen();
    if (isOpen) {
      await this.closeOtherAccordionTriggers();
    }
  }
  async close() {
    await this.collapseTriggerEl.close(false);
  }
  get collapseTriggerProps() {
    return getCollapseTriggerProps(this);
  }
  render() {
    return (h(Host, null, h("brx-collapse-trigger", Object.assign({}, this.collapseTriggerProps, { onBrxTriggerClick: () => this.handleClick(), ref: el => void (this.collapseTriggerEl = el) }), h("slot", null))));
  }
  get el() { return getElement(this); }
};
BrxAccordionTrigger.style = brxAccordionTriggerCss;

export { BrxAccordionTrigger as brx_accordion_trigger };
