import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';

const brxPaginationItemsCss = "brx-pagination-items{display:block}";

const BrxPaginationItems = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
BrxPaginationItems.style = brxPaginationItemsCss;

export { BrxPaginationItems as brx_pagination_items };
