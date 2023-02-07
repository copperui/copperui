import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';

const brxCardContentCss = "brx-card-content{display:block}";

const BrxCardContent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
BrxCardContent.style = brxCardContentCss;

export { BrxCardContent as brx_card_content };
