import { r as registerInstance, h, e as Host, g as getElement } from './index-1e49f12c.js';

const brxTabCss = "brx-tab{display:block}";

const BrxTab = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.counter = undefined;
    this.label = undefined;
    this.value = undefined;
    this.iconName = undefined;
    this.tabTitle = undefined;
    this.tooltipText = undefined;
  }
  setActive(active) {
    if (active) {
      this.el.setAttribute('active', '');
    }
    else {
      this.el.removeAttribute('active');
    }
    return Promise.resolve();
  }
  render() {
    const { tabTitle, iconName, label, tooltipText } = this;
    return (h(Host, { role: "listitem", title: tabTitle }, h("brx-tooltip-auto", { "tooltip-text": tooltipText }, h("button", { type: "button", "aria-label": label !== null && label !== void 0 ? label : tooltipText }, h("span", { class: "name" }, h("span", { class: "d-flex flex-column flex-sm-row" }, h("slot", { name: "icon" }, iconName && (h("span", { class: "icon mb-1 mb-sm-0 mr-sm-1" }, h("brx-icon", { name: iconName })))), tabTitle && h("span", { class: "name" }, tabTitle)))), h("slot", null), h("span", { class: "brx-tab-results" }, h("slot", { name: "results" })))));
  }
  get el() { return getElement(this); }
};
BrxTab.style = brxTabCss;

export { BrxTab as brx_tab };
