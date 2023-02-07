import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { i as inheritAriaAttributes } from './inherited-attributes-f0d17fe4.js';

const brxAccordionLegacyEntryItemCss = "brx-accordion-legacy-entry-item{border-bottom:1px solid var(--color-secondary-04);display:flex;flex-direction:column}brx-accordion-legacy-entry-item .header{--bg-color:transparent;background:var(--bg-color);border:0;color:var(--interactive);display:flex;font-size:var(--font-size-scale-up-01);justify-content:space-between;outline:none;padding:var(--spacing-scale-2x) 0;text-align:left;text-decoration:none;width:100%}brx-accordion-legacy-entry-item .header brx-icon{margin:0 var(--spacing-scale-2x) 0 var(--spacing-scale-baseh)}brx-accordion-legacy-entry-item .header .title{flex:1;margin:0}brx-accordion-legacy-entry-item .header:focus{outline:none}brx-accordion-legacy-entry-item .header.focus-visible,brx-accordion-legacy-entry-item .header:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-accordion-legacy-entry-item .header:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-accordion-legacy-entry-item[active]{border-bottom:0}brx-accordion-legacy-entry-item[active] .header{font-weight:var(--font-weight-semi-bold)}brx-accordion-legacy-entry-item[active]+brx-accordion-legacy-entry-content{border-bottom:1px solid var(--color-secondary-04);display:block}";

const BrxAccordionLegacyEntryItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.collapseChangeEmitter = createEvent(this, "collapseChange", 7);
    this.inheritedAttributes = {};
    this.active = false;
    this.entryId = undefined;
  }
  handleChange() {
    this.collapseChangeEmitter.emit(this.el);
  }
  handleClick() {
    this.active = !this.active;
  }
  componentWillLoad() {
    this.inheritedAttributes = inheritAriaAttributes(this.el);
  }
  render() {
    const iconName = this.active ? 'angle-up' : 'angle-down';
    const attrs = Object.assign({}, (this.entryId ? { ['aria-controls']: this.entryId } : {}));
    return (h(Host, null, h("button", Object.assign({ class: "header", type: "button" }, attrs, this.inheritedAttributes), h("span", { class: "icon" }, h("brx-icon", { name: iconName })), h("div", { class: "title" }, h("slot", null)))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["handleChange"]
  }; }
};
BrxAccordionLegacyEntryItem.style = brxAccordionLegacyEntryItemCss;

export { BrxAccordionLegacyEntryItem as brx_accordion_legacy_entry_item };
