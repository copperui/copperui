import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { T as TOKEN_UNCONTROLLED, g as getControlledValue } from './tokens-3a672c03.js';

const brxScrimCss = "brx-scrim[type=foco]{background:var(--surface-overlay-scrim);bottom:0;display:none;height:100%;left:0;position:fixed;right:0;top:0;width:100%;z-index:999}brx-scrim[type=foco] brx-modal{left:50%;max-height:90%;overflow:auto;position:absolute;top:50%;transform:translate(-50%, -50%);transform:translate(-50%, -50%);z-index:1000}brx-scrim[type=foco][data-active]{display:block}brx-scrim[type=inibicao]{position:relative}brx-scrim[type=inibicao]::before{background:var(--surface-overlay-scrim);content:\"\";height:100%;left:0;position:absolute;top:0;width:100%}brx-scrim[type=legibilidade]{position:relative}brx-scrim[type=legibilidade] .scrim-text{background:var(--surface-overlay-text);bottom:0;left:0;padding:var(--spacing-scale-3x) var(--spacing-scale-baseh);position:absolute;width:100%}";

const DOMStrings = {
  closeElement: '[data-scrim-dismiss]',
};
const BrxScrim = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxScrimChange = createEvent(this, "brxScrimChange", 7);
    this.active = undefined;
    this.controlledActive = TOKEN_UNCONTROLLED;
    this.currentActive = false;
    this.type = 'foco';
    this.closeElement = DOMStrings.closeElement;
  }
  syncCurrentActiveFromProps() {
    this.currentActive = getControlledValue(this.controlledActive, this.active, false);
  }
  setActive(isActive) {
    if (this.controlledActive === TOKEN_UNCONTROLLED) {
      this.currentActive = isActive;
    }
    this.brxScrimChange.emit({ active: isActive });
  }
  async showScrim() {
    this.setActive(true);
  }
  async hideScrim() {
    this.setActive(false);
  }
  handleClickFoco(event) {
    const closeElement = this.closeElement;
    const target = event.target;
    if (target === this.el) {
      this.hideScrim();
    }
    if (closeElement && target.closest(closeElement)) {
      this.hideScrim();
    }
  }
  handleClick(event) {
    switch (this.type) {
      case 'foco': {
        this.handleClickFoco(event);
        break;
      }
      default: {
        break;
      }
    }
  }
  get baseAttributes() {
    switch (this.type) {
      case 'foco': {
        return {
          ['data-scrim']: 'true',
          ['data-visible']: this.currentActive,
          ['aria-expanded']: this.currentActive,
        };
      }
      default: {
        return {};
      }
    }
  }
  render() {
    return (h(Host, Object.assign({}, this.baseAttributes, { "data-active": this.currentActive ? true : null }), h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["syncCurrentActiveFromProps"],
    "controlledActive": ["syncCurrentActiveFromProps"]
  }; }
};
BrxScrim.style = brxScrimCss;

export { BrxScrim as brx_scrim };
