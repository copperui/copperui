import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';
import { a as generateUniqueId } from './helpers-da43c71e.js';

const brxAccordionLegacyEntryCss = "brx-accordion-legacy-entry{display:block}";

const BrxAccordionLegacyEntry = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.content = undefined;
    this.entryId = undefined;
    this.headerTitle = undefined;
  }
  componentWillLoad() {
    if (this.entryId === undefined) {
      this.entryId = generateUniqueId();
    }
  }
  render() {
    return (h(Host, null, h("brx-accordion-legacy-entry-item", { entryId: this.entryId }, h("slot", { name: "title" }, this.headerTitle)), h("brx-accordion-legacy-entry-content", { entryId: this.entryId }, h("slot", { name: "content" }, this.content))));
  }
};
BrxAccordionLegacyEntry.style = brxAccordionLegacyEntryCss;

export { BrxAccordionLegacyEntry as brx_accordion_legacy_entry };
