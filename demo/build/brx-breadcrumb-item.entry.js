import { r as registerInstance, h, e as Host, F as Fragment } from './index-1e49f12c.js';

const brxBreadcrumbItemCss = "";

const BrxBreadcrumbItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.home = false;
    this.active = false;
  }
  render() {
    return (h(Host, null, !this.home && (h(Fragment, null, h("brx-icon", { class: "icon", name: "fa5/fas/chevron-right" }))), h("slot", null)));
  }
};
BrxBreadcrumbItem.style = brxBreadcrumbItemCss;

export { BrxBreadcrumbItem as brx_breadcrumb_item };
