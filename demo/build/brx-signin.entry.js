import { r as registerInstance, h, e as Host, F as Fragment } from './index-1e49f12c.js';

const brxSigninCss = "brx-signin{display:inline-block}";

const BrxSignin = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = 'Entrar';
    this.showIcon = true;
    this.showLabel = true;
    this.iconName = 'fa5/fas/user';
  }
  // end brx-signin props
  render() {
    return (h(Host, null, h("slot", { name: "content" }, this.showIcon && h("brx-icon", { name: this.iconName }), this.showLabel && h(Fragment, null, this.label), h("slot", null))));
  }
};
BrxSignin.style = brxSigninCss;

export { BrxSignin as brx_signin };
