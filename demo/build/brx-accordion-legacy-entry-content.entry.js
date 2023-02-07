import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';

const brxAccordionLegacyEntryContentCss = "brx-accordion-legacy-entry-content{color:var(--text-color);display:none;font-size:var(--font-size-scale-base);margin:0 var(--spacing-scale-base);padding:var(--spacing-scale-base) var(--spacing-scale-8x) var(--spacing-scale-2x)}brx-accordion-legacy-entry-content *:last-child{margin-bottom:0}";

const BrxAccordionLegacyEntryContent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.entryId = undefined;
  }
  render() {
    return (h(Host, Object.assign({}, (this.entryId ? { id: this.entryId } : {})), h("slot", null)));
  }
};
BrxAccordionLegacyEntryContent.style = brxAccordionLegacyEntryContentCss;

export { BrxAccordionLegacyEntryContent as brx_accordion_legacy_entry_content };
