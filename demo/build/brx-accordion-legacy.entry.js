import { r as registerInstance, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { f as findTargets, t as tryParseJSON } from './helpers-da43c71e.js';

const brxAccordionLegacyCss = "brx-accordion-legacy{display:block;background:var(--bg-color);border-top:1px solid var(--color-secondary-04)}brx-accordion-legacy[negative]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color);--bg-color:var(--background-dark)}";

const BrxAccordionLegacy = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.single = false;
    this.negative = false;
    this.entries = undefined;
  }
  get childEntryItems() {
    return findTargets('brx-accordion-legacy-entry-item', this.el);
  }
  get parsedEntries() {
    const incomingEntries = tryParseJSON(this.entries);
    if (Array.isArray(incomingEntries)) {
      return incomingEntries;
    }
    return [];
  }
  handleCollapseChange(event) {
    const detail = event.detail;
    const { active } = detail;
    if (this.single && active) {
      this.handleCollapseSingle(detail);
    }
  }
  handleCollapseSingle(targetItem) {
    const remainingItems = this.childEntryItems.filter(i => i !== targetItem);
    for (const remainingItem of remainingItems) {
      remainingItem.active = false;
    }
  }
  render() {
    return (h(Host, null, this.parsedEntries.map(entry => (h("brx-accordion-legacy-entry", { key: entry.id }, h("div", { slot: "title" }, entry.title), h("div", { slot: "content" }, entry.content)))), h("slot", null)));
  }
  get el() { return getElement(this); }
};
BrxAccordionLegacy.style = brxAccordionLegacyCss;

export { BrxAccordionLegacy as brx_accordion_legacy };
