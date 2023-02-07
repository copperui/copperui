import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';

const brxPaginationPerPageCss = "brx-pagination-per-page{display:block}";

const BrxPaginationPerPage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
BrxPaginationPerPage.style = brxPaginationPerPageCss;

export { BrxPaginationPerPage as brx_pagination_per_page };
