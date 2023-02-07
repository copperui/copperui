import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';

const brxCardFooterCss = "brx-card-footer{display:block}";

const BrxCardFooter = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
BrxCardFooter.style = brxCardFooterCss;

export { BrxCardFooter as brx_card_footer };
