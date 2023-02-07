import { r as registerInstance, h, e as Host, F as Fragment } from './index-1e49f12c.js';

const brxIconCss = "brx-icon,brx-icon i{display:inline-flex;align-items:center;justify-content:center}brx-icon i{color:inherit}";

const BrxIcon = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = undefined;
    this.loadResources = true;
    this.iconClass = undefined;
  }
  render() {
    const { iconClass = '' } = this;
    const name = this.name.includes('/') ? this.name : `fa5/fas/${this.name}`;
    if (name.startsWith('fa5')) {
      const [, style, identifier] = name.split('/');
      return (h(Host, null, this.loadResources && (h(Fragment, null, h("link", { href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css", rel: "stylesheet" }))), h("i", { class: `${style} fa-${identifier} ${iconClass}`, "aria-hidden": "true" })));
    }
    return h(Host, null);
  }
};
BrxIcon.style = brxIconCss;

export { BrxIcon as brx_icon };
