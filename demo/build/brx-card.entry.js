import { r as registerInstance, h, e as Host, g as getElement } from './index-1e49f12c.js';

const brxCardCss = "brx-card{display:block;--card-padding:var(--spacing-scale-2x);--card-height-fixed:250px;background:var(--background);box-shadow:var(--surface-shadow-sm);color:var(--color);margin-bottom:var(--spacing-scale-2x)}brx-card brx-card-content{padding:var(--card-padding)}brx-card brx-card-content *:last-child{margin-bottom:0}brx-card brx-card-header{padding:var(--card-padding) var(--card-padding) 0}brx-card brx-card-footer{padding:0 var(--card-padding) var(--card-padding)}brx-card[h-fixed] brx-card-content{max-height:var(--card-height-fixed);overflow-y:auto}brx-card[h-fixed] brx-card-content::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-card[h-fixed] brx-card-content::-webkit-scrollbar-track{background:var(--gray-10)}brx-card[h-fixed] brx-card-content::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-card[h-fixed] brx-card-content:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}brx-card[h-fixed] brx-card-footer{padding-top:var(--card-padding)}brx-card[hover]:hover{background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-card[dark-mode]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}";

const BrxCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hFixed = false;
    this.hover = false;
    this.darkMode = false;
    this.disabled = false;
  }
  watchDisabled() {
    this.syncDisabledState();
  }
  async syncDisabledState() {
    const { disabled } = this;
    const elements = Array.from(this.el.querySelectorAll('button, input, select, textarea'));
    for (const element of elements) {
      if (disabled) {
        element.setAttribute('disabled', 'disabled');
      }
      else {
        element.removeAttribute('disabled');
      }
    }
  }
  componentDidLoad() {
    this.syncDisabledState();
  }
  render() {
    const hostProps = Object.assign({}, (this.disabled ? { 'aria-hidden': 'true' } : {}));
    return (h(Host, Object.assign({}, hostProps), h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "disabled": ["watchDisabled"]
  }; }
};
BrxCard.style = brxCardCss;

export { BrxCard as brx_card };
