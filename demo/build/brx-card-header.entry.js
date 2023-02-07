import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';

const brxCardHeaderCss = "brx-card-header{display:block}";

const BrxCardHeader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
BrxCardHeader.style = brxCardHeaderCss;

export { BrxCardHeader as brx_card_header };
