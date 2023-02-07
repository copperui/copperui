import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { i as inheritAriaAttributes } from './inherited-attributes-f0d17fe4.js';

const brxButtonCss = "brx-button{display:inline-block;--button-radius:100em;--button-xsmall:24px;--button-small:32px;--button-medium:40px;--button-large:48px;--button-size:var(--button-medium)}brx-button .brx-button-native{align-items:center;background-color:transparent;border:0;border-radius:var(--button-radius);color:var(--interactive);cursor:pointer;display:inline-flex;font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-semi-bold);height:var(--button-size);justify-content:center;overflow:hidden;padding:0 var(--spacing-scale-3x);position:relative;text-align:center;vertical-align:middle;white-space:nowrap;width:auto}brx-button[block]{display:block}brx-button[block] .brx-button-native{width:100%}@media (min-width: 576px){brx-button.block-sm .brx-button-native{width:100%}brx-button.auto-sm .brx-button-native{width:auto}}@media (min-width: 992px){brx-button.block-md .brx-button-native{width:100%}brx-button.auto-md .brx-button-native{width:auto}}@media (min-width: 1280px){brx-button.block-lg .brx-button-native{width:100%}brx-button.auto-lg .brx-button-native{width:auto}}@media (min-width: 1600px){brx-button.block-xl .brx-button-native{width:100%}brx-button.auto-xl .brx-button-native{width:auto}}brx-button[circle] .brx-button-native{padding:0;border-radius:50%;width:var(--button-size)}brx-button[size=xsmall]{--button-size:var(--button-xsmall)}brx-button[size=small]{--button-size:var(--button-small)}brx-button[size=medium]{--button-size:var(--button-medium)}brx-button[size=large]{--button-size:var(--button-large)}brx-button[variant=primary]{--interactive-rgb:var(--color-dark-rgb)}brx-button[variant=primary] .brx-button-native{background-color:var(--interactive-light);color:var(--color-dark)}brx-button[variant=secondary] .brx-button-native{background-color:var(--background-light);border:1px solid var(--interactive)}brx-button[color=danger]{--interactive-rgb:var(--color-dark-rgb)}brx-button[color=danger] .brx-button-native{background-color:var(--danger)}brx-button[color=danger] .brx-button-native{color:var(--color-dark)}brx-button[color=success]{--interactive-rgb:var(--color-dark-rgb)}brx-button[color=success] .brx-button-native{background-color:var(--success)}brx-button[color=success] .brx-button-native{color:var(--color-dark)}brx-button[color=warning]{--interactive-rgb:var(--color-light-rgb)}brx-button[color=warning] .brx-button-native{background-color:var(--warning)}brx-button[color=warning] .brx-button-native{color:var(--color-light)}brx-button[color=info]{--interactive-rgb:var(--color-dark-rgb)}brx-button[color=info] .brx-button-native{background-color:var(--info)}brx-button[color=info] .brx-button-native{color:var(--color-dark)}brx-button:disabled .brx-button-native,brx-button[disabled] .brx-button-native{cursor:not-allowed}brx-button:not(:disabled):not([disabled]) .brx-button-native{--focus-offset:var(--spacing-scale-half)}brx-button:not(:disabled):not([disabled]) .brx-button-native:focus{outline:none}brx-button:not(:disabled):not([disabled]) .brx-button-native.focus-visible,brx-button:not(:disabled):not([disabled]) .brx-button-native:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-button:not(:disabled):not([disabled]) .brx-button-native:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-button:not(:disabled):not([disabled]) .brx-button-native:not(:disabled):active{background-image:linear-gradient(rgba(var(--interactive-rgb), var(--pressed)), rgba(var(--interactive-rgb), var(--pressed)))}brx-button[active] .brx-button-native{--hover:var(--hover-dark);background-color:var(--active);color:var(--color-dark)}brx-button brx-loading{width:auto;height:auto}brx-button brx-loading::after{margin:0;border-color:var(--interactive) var(--interactive) transparent;border-style:solid}brx-button[variant=primary] brx-loading::after,brx-button[color=success] brx-loading::after,brx-button[color=danger] brx-loading::after,brx-button[color=info] brx-loading::after{border-color:var(--background) var(--background) transparent}brx-button[dark-mode] .brx-button-native{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color);color:var(--interactive-dark)}brx-button[dark-mode][variant=primary] .brx-button-native{--interactive-rgb:var(--background-dark-rgb);background-color:var(--interactive-dark);color:var(--background-dark)}brx-button[dark-mode][variant=secondary] .brx-button-native{background-color:var(--background-dark)}brx-button[dark-mode][active] .brx-button-native{--hover:var(--hover-light);--interactive-rgb:var(--active-rgb);background-color:var(--background-light);color:var(--active)}brx-button a.brx-button-native{font-weight:var(--font-weight-semi-bold);text-decoration:none !important}brx-button[signin]{--background:var(--gray-2);--sign-in-img:20px}brx-button[signin][variant=default] .brx-button-native{background-color:var(--background)}brx-button[signin] .brx-button-native{padding:0 var(--spacing-scale-2x)}brx-button[signin] .brx-button-native img{max-height:var(--sign-in-img)}brx-button[signin][signin=avatar] .brx-button-native{height:auto;padding:var(--spacing-scale-base)}brx-button[signin][dark-mode]{--background:var(--background-dark)}brx-button[magic]{--magic-size:var(--magic-medium);--magic-small:var(--spacing-scale-4xh);--magic-medium:var(--spacing-scale-5xh);--magic-large:var(--spacing-scale-6xh);--magic-support-size:var(--magic-support-medium);--magic-support-small:var(--spacing-scale-7x);--magic-support-medium:var(--spacing-scale-8x);--magic-support-large:var(--spacing-scale-9x);--magic-z-index:var(--z-index-layer-1);align-items:center;background-color:var(--gray-5);border-radius:100em;box-shadow:var(--surface-shadow-md);display:inline-flex;height:var(--magic-support-size);padding:calc((var(--magic-support-size) - var(--magic-size)) * 0.5)}brx-button[magic][size=small]{--magic-size:var(--magic-small);--magic-support-size:var(--magic-support-small)}brx-button[magic][size=medium]{--magic-size:var(--magic-medium);--magic-support-size:var(--magic-support-medium)}brx-button[magic][size=large]{--magic-size:var(--magic-large);--magic-support-size:var(--magic-support-large)}brx-button[magic] .svg-inline--fa,brx-button[magic] .fa,brx-button[magic] .fab,brx-button[magic] .fad,brx-button[magic] .fal,brx-button[magic] .far,brx-button[magic] .fas{--icon-size:var(--icon-size-lg)}brx-button[magic] .brx-button-native{--focus-offset:calc((var(--magic-support-size) - var(--magic-size)) * 0.5 + 4px);--button-size:var(--magic-size);background-color:var(--interactive-alternative);color:var(--color-dark);font-size:var(--font-size-scale-up-02);font-weight:var(--font-weight-semi-bold)}brx-button[magic] .brx-button-native:not(:disabled):not(.disabled):not([data-disable-hover-interaction]):not(:disabled):hover{background-image:linear-gradient(rgba(var(--color-dark-rgb), var(--hover)), rgba(var(--color-dark-rgb), var(--hover)))}brx-button[magic] .brx-button-native:not(:disabled):not(.disabled):not(:disabled):active{background-image:linear-gradient(rgba(var(--color-dark-rgb), var(--pressed)), rgba(var(--color-dark-rgb), var(--pressed)))}";

const BrxButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxFocus = createEvent(this, "brxFocus", 7);
    this.brxBlur = createEvent(this, "brxBlur", 7);
    // end brx-button props
    this.inheritedAttributes = {};
    this.nativeClass = '';
    this.buttonType = 'button';
    this.disabled = false;
    this.download = undefined;
    this.href = undefined;
    this.rel = undefined;
    this.strong = false;
    this.target = undefined;
    this.type = 'button';
    this.block = false;
    this.circle = false;
    this.darkMode = false;
    this.active = false;
    this.loading = false;
    this.color = undefined;
    this.size = 'medium';
    this.variant = 'default';
    this.signin = false;
    this.magic = false;
  }
  componentWillLoad() {
    this.inheritedAttributes = inheritAriaAttributes(this.el);
  }
  render() {
    var _a;
    const { type, disabled, rel, target, href, inheritedAttributes } = this;
    const TagType = href === undefined ? 'button' : 'a';
    const attrs = TagType === 'button'
      ? { type }
      : {
        rel,
        href,
        target,
        download: this.download,
      };
    const allNativeClasses = `brx-button-native ${(_a = this.nativeClass) !== null && _a !== void 0 ? _a : ''}`;
    return (h(Host, { "aria-disabled": disabled ? 'true' : null }, h(TagType, Object.assign({}, attrs, { class: allNativeClasses, "data-size": this.size, part: "native", disabled: disabled }, inheritedAttributes), this.loading && h("brx-loading", { size: "" }, "Carregando"), !this.loading && h("slot", null))));
  }
  get el() { return getElement(this); }
};
BrxButton.style = brxButtonCss;

export { BrxButton as brx_button };
