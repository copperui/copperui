import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';

const brxPaginationArrowsCss = "brx-pagination-arrows{display:block}";

const BrxPaginationArrows = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
BrxPaginationArrows.style = brxPaginationArrowsCss;

export { BrxPaginationArrows as brx_pagination_arrows };
