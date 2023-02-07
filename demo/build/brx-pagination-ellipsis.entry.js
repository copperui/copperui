import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';
import { a as generateUniqueId } from './helpers-da43c71e.js';

const brxPaginationEllipsisCss = ":host{display:block}";

const BrxPaginationEllipsis = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dropdownId = undefined;
  }
  componentWillLoad() {
    if (!this.dropdownId) {
      this.dropdownId = generateUniqueId();
    }
  }
  render() {
    const { dropdownId } = this;
    const label = 'Abrir listagem.';
    return (h(Host, null, h("brx-dropdown", null, h("brx-dropdown-trigger", { target: `#${dropdownId}` }, h("brx-button", { circle: true, type: "button", "aria-label": label, title: label }, h("brx-icon", { name: "fa5/fas/ellipsis-h" }))), h("div", { class: "brx-pagination-ellipsis-dropdown-content", id: dropdownId, hidden: true }, h("slot", null)))));
  }
};
BrxPaginationEllipsis.style = brxPaginationEllipsisCss;

export { BrxPaginationEllipsis as brx_pagination_ellipsis };
