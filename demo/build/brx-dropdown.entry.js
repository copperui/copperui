import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';

const brxDropdownCss = "brx-dropdown{display:block;position:relative}brx-dropdown brx-dropdown-trigger+*{box-shadow:var(--surface-shadow-sm);left:0;position:absolute;top:100%}brx-dropdown>brx-notification{left:auto;right:0}brx-dropdown brx-item{--color:var(--color-light);--color-rgb:var(--color-light-rgb);--text-color:var(--color);--interactive:var(--interactive-light);--interactive-rgb:var(--interactive-light-rgb);--visited:var(--visited-light);--hover:var(--hover-light);--pressed:var(--pressed-light);--focus-color:var(--focus-color-light);--focus:var(--focus-color);--item-padding-y:var(--spacing-scale-2x);--interactive-rgb:var(--color-rgb);background-color:var(--background-light);color:var(--color)}brx-dropdown brx-item:not(:last-child){border-bottom:1px solid var(--border-color)}brx-dropdown brx-item[selected]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}";

const BrxDropdown = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
BrxDropdown.style = brxDropdownCss;

export { BrxDropdown as brx_dropdown };
