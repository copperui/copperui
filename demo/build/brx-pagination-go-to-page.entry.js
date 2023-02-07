import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';

const brxPaginationGoToPageCss = "brx-pagination-go-to-page{display:block}";

const BrxPaginationGoToPage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
BrxPaginationGoToPage.style = brxPaginationGoToPageCss;

export { BrxPaginationGoToPage as brx_pagination_go_to_page };
