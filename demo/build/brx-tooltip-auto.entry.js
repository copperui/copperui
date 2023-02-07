import { r as registerInstance, h, e as Host, F as Fragment, g as getElement } from './index-1e49f12c.js';
import { a as generateUniqueId } from './helpers-da43c71e.js';

const BrxTooltipAuto = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.place = 'bottom';
    this.tooltipText = undefined;
    this.tooltipContentId = undefined;
  }
  componentWillLoad() {
    if (!this.tooltipContentId) {
      this.tooltipContentId = generateUniqueId();
    }
  }
  get enabled() {
    return !!this.tooltipText;
  }
  render() {
    const { place, enabled, tooltipText, tooltipContentId } = this;
    return (h(Host, null, enabled && (h(Fragment, null, h("brx-tooltip", { target: `#${tooltipContentId}`, class: "brx-tooltip-auto-container", place: place }, h("slot", null)), h("brx-tooltip-content", { id: tooltipContentId }, tooltipText))), !enabled && (h("div", { class: "brx-tooltip-auto-container" }, h("slot", null)))));
  }
  get el() { return getElement(this); }
};

export { BrxTooltipAuto as brx_tooltip_auto };
