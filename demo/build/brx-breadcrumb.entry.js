import { r as registerInstance, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { f as findTargets, g as getWindow, a as generateUniqueId } from './helpers-da43c71e.js';

const brxBreadcrumbCss = "brx-breadcrumb{display:inline-grid;font-size:var(--font-size-scale-down-01);font-weight:var(--font-weight-medium);position:relative}brx-breadcrumb brx-breadcrumb-list{align-items:center;border:0;display:flex;list-style:none;margin:0;overflow-x:auto;overflow-y:hidden;padding:0}brx-breadcrumb brx-breadcrumb-list brx-breadcrumb-item:not(.menu-mobil):not(:nth-child(1)){order:2}brx-breadcrumb brx-breadcrumb-list brx-breadcrumb-item:nth-child(1){order:0}brx-breadcrumb brx-breadcrumb-list brx-breadcrumb-item.menu-mobil{order:1}brx-breadcrumb brx-breadcrumb-item{align-items:center;display:flex;height:var(--spacing-scale-5x);margin:auto 0 auto -5px}brx-breadcrumb brx-breadcrumb-item brx-icon.icon{color:var(--border-color);font-size:var(--icon-size-sm);margin-right:-6px}brx-breadcrumb brx-breadcrumb-item brx-tooltip{display:flex;align-items:center}brx-breadcrumb brx-breadcrumb-item a{display:inline-block;max-width:180px;overflow:hidden;padding:0 6px;text-decoration:none;text-overflow:ellipsis;white-space:nowrap}brx-breadcrumb brx-breadcrumb-item:last-child span{font-weight:var(--font-weight-medium);padding:0 0 0 var(--spacing-scale-base);white-space:nowrap}brx-breadcrumb brx-breadcrumb-item[home],brx-breadcrumb .menu-mobil{--focus-offset:calc(var(--spacing-scale-half) * -1);margin-left:0;margin-right:-3px}@media (max-width: 991px){brx-breadcrumb brx-breadcrumb-item a:not(.brx-button-native){display:block;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}brx-breadcrumb .menu-mobil,brx-breadcrumb .menu-mobil+brx-breadcrumb-item,brx-breadcrumb brx-breadcrumb-item[home]+brx-breadcrumb-item{display:flex}}brx-breadcrumb brx-breadcrumb-card{left:var(--spacing-scale-9x);min-width:fit-content;position:absolute;top:var(--spacing-scale-7x);z-index:var(--z-index-layer-1)}brx-breadcrumb brx-item{color:var(--color);cursor:pointer;padding:0}brx-breadcrumb brx-item:not(:last-child){border-bottom:1px solid var(--border-color)}brx-breadcrumb brx-item a{--interactive:var(--color);--interactive-rgb:var(--color-rgb);display:block;padding:var(--spacing-scale-2x)}@media (max-width: 575px){brx-breadcrumb .menu-mobil>brx-icon{display:none}brx-breadcrumb brx-breadcrumb-card{left:var(--spacing-scale-base);width:250px}}";

const BrxBreadcrumb = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dropdownId = undefined;
  }
  getItems() {
    return findTargets('brx-breadcrumb-list brx-breadcrumb-item', this.el);
  }
  setMenuMobileVisibility(isVisible) {
    const { menuMobileEl } = this;
    if (menuMobileEl) {
      if (isVisible) {
        menuMobileEl.removeAttribute('hidden');
      }
      else {
        menuMobileEl.setAttribute('hidden', '');
      }
    }
  }
  showMenuMobile() {
    this.setMenuMobileVisibility(true);
  }
  hideMenuMobile() {
    this.setMenuMobileVisibility(true);
  }
  setView() {
    this.reset();
    const win = getWindow();
    const hideAllBreakpoint = win.innerWidth < 575;
    for (const list of Array.from(this.el.querySelectorAll('brx-breadcrumb-list'))) {
      const items = Array.from(list.querySelectorAll('brx-breadcrumb-item')).filter(item => !item.active && !item.matches('.menu-mobil'));
      const partialHideBreakpoint = (!hideAllBreakpoint && list.scrollWidth > list.offsetWidth) || items.length > 5;
      const itemsToHide = [
        ...(hideAllBreakpoint && items.length !== 1 ? items : []),
        ...(partialHideBreakpoint ? items.filter((_, index) => index > 0 && index < items.length - 1) : []),
      ];
      for (const item of itemsToHide) {
        item.classList.add('d-none');
      }
      if (itemsToHide.length) {
        this.showMenuMobile();
      }
    }
  }
  reset() {
    this.hideMenuMobile();
    const items = this.getItems();
    for (const item of items) {
      if (item.matches('.menu-mobil')) {
        continue;
      }
      item.classList.remove('d-none');
    }
  }
  handleGlobalResize() {
    this.setView();
  }
  componentWillLoad() {
    if (!this.dropdownId) {
      this.dropdownId = generateUniqueId();
    }
  }
  componentDidLoad() {
    this.setView();
  }
  render() {
    const { dropdownId } = this;
    return (h(Host, null, h("brx-breadcrumb-list", null, h("brx-breadcrumb-item", { hidden: true, class: "menu-mobil" }, h("brx-dropdown-trigger", { target: `#${dropdownId}`, iconToShow: "fa5/fas/folder-plus", iconToHide: "fa5/fas/folder-minus" }, h("brx-button", { circle: true }, h("span", { class: "sr-only" }, "Bot\u00E3o Menu"), h("brx-icon", { "data-collapse-icon": "", name: "fa5/fas/folder-plus" })))), h("slot", null)), h("brx-breadcrumb-card", { id: dropdownId, hidden: true })));
  }
  get el() { return getElement(this); }
};
BrxBreadcrumb.style = brxBreadcrumbCss;

export { BrxBreadcrumb as brx_breadcrumb };
