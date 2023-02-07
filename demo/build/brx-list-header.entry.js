import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';

const BrxListHeader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.headerTitle = undefined;
  }
  render() {
    return (h(Host, null, h("slot", { name: "title" }, h("div", { class: "brx-header-title" }, this.headerTitle))));
  }
};

export { BrxListHeader as brx_list_header };
