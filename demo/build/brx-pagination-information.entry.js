import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';

const brxPaginationInformationCss = "brx-pagination-information{display:block}";

const BrxPaginationInformation = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
BrxPaginationInformation.style = brxPaginationInformationCss;

export { BrxPaginationInformation as brx_pagination_information };
