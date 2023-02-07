import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';

const brxSelectToggleCss = "brx-select-toggle{display:block}";

const BrxSelectToggle = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.expanded = false;
  }
  get label() {
    return this.expanded ? 'Esconder lista.' : 'Exibir lista.';
  }
  render() {
    const { label, expanded } = this;
    return (h(Host, null, h("brx-button", { "aria-label": label, size: "small", title: label, tabindex: "-1" }, h("brx-icon", { name: expanded ? 'fa5/fas/angle-up' : 'fa5/fas/angle-down', "aria-hidden": "true" }), h("slot", null))));
  }
};
BrxSelectToggle.style = brxSelectToggleCss;

export { BrxSelectToggle as brx_select_toggle };
