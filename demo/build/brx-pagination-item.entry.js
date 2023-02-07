import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';
import { p as parseTarget, i as isSpecialToken } from './brx-pagination-item-interface-b039e6c3.js';

const brxPaginationItemCss = "brx-pagination-item{display:block}";

const BrxPaginationItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this._target = undefined;
    this.active = undefined;
    this.disabled = undefined;
  }
  getTarget() {
    return Promise.resolve(this.target);
  }
  get target() {
    return parseTarget(this._target);
  }
  get mode() {
    return isSpecialToken(this.target) ? 'jump' : 'page';
  }
  get jumpButton() {
    switch (this.target) {
      case 'first': {
        return {
          label: 'Página Inicial',
          icon: 'fa5/fas/step-backward',
        };
      }
      case 'prev': {
        return {
          label: 'Página Anterior',
          icon: 'fa5/fas/angle-left',
        };
      }
      case 'next': {
        return {
          label: 'Página Seguinte',
          icon: 'fa5/fas/angle-right',
        };
      }
      case 'last': {
        return {
          label: 'Última Página',
          icon: 'fa5/fas/step-forward',
        };
      }
      default: {
        return null;
      }
    }
  }
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  render() {
    const { disabled, mode, jumpButton } = this;
    return (h(Host, { tabindex: mode === 'page' ? 0 : null, "data-mode": mode }, mode === 'jump' && jumpButton && (h("brx-button", { disabled: disabled, type: "button", circle: true }, h("brx-icon", { name: jumpButton.icon, "aria-label": jumpButton.label, title: jumpButton.label }))), mode === 'page' && h("slot", { name: "page" }, this.target)));
  }
};
BrxPaginationItem.style = brxPaginationItemCss;

export { BrxPaginationItem as brx_pagination_item };
