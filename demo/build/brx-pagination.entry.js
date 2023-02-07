import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { T as TOKEN_UNCONTROLLED } from './tokens-3a672c03.js';
import { f as findTargets } from './helpers-da43c71e.js';
import { i as isSpecialToken, p as parseTarget } from './brx-pagination-item-interface-b039e6c3.js';

const brxPaginationCss = "brx-pagination{display:block;--pagination-margin:var(--spacing-scale-base);--pagination-select-width:88px;--pagination-size:var(--pagination-medium);--pagination-small:24px;--pagination-medium:32px;--pagination-large:40px;color:var(--color);display:flex;flex-wrap:wrap;font-weight:var(--font-weight);justify-content:center}brx-pagination brx-pagination-items{align-items:center;display:flex;list-style:none;margin:0;padding:0}brx-pagination brx-pagination-item{padding:0}brx-pagination brx-pagination-item:focus{outline:none}brx-pagination brx-pagination-item.focus-visible,brx-pagination brx-pagination-item:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-pagination brx-pagination-item[data-mode=jump][disabled]{opacity:unset}brx-pagination brx-pagination-item[data-mode=page]{align-items:center;border:1px solid transparent;border-radius:100em;color:var(--interactive);display:inline-flex;justify-content:center;margin:0 calc(var(--pagination-margin) * 0.5);min-height:var(--pagination-size);min-width:var(--pagination-size);padding:0 var(--spacing-scale-base);white-space:nowrap}brx-pagination brx-pagination-item[data-mode=page]:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-pagination brx-pagination-item[data-mode=page][active]{background:var(--active);color:var(--color-dark);font-weight:var(--font-weight-semi-bold)}brx-pagination brx-pagination-ellipsis{margin:0 calc(var(--pagination-margin) * 0.5);position:relative}brx-pagination brx-pagination-ellipsis brx-button{--button-size:var(--pagination-size)}brx-pagination brx-pagination-ellipsis .brx-pagination-ellipsis-dropdown-content{max-height:220px;min-width:4em;overflow-y:auto;z-index:var(--z-index-layer-1)}brx-pagination brx-pagination-ellipsis .brx-pagination-ellipsis-dropdown-content::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-pagination brx-pagination-ellipsis .brx-pagination-ellipsis-dropdown-content::-webkit-scrollbar-track{background:var(--gray-10)}brx-pagination brx-pagination-ellipsis .brx-pagination-ellipsis-dropdown-content::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-pagination brx-pagination-ellipsis .brx-pagination-ellipsis-dropdown-content:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}brx-pagination[size=small]{--pagination-size:var(--pagination-small)}brx-pagination[size=medium]{--pagination-size:var(--pagination-medium)}brx-pagination[size=large]{--pagination-size:var(--pagination-large)}brx-pagination brx-pagination-information{align-items:center;display:flex}brx-pagination brx-pagination-per-page,brx-pagination brx-pagination-go-to-page{align-items:center;display:flex}brx-pagination brx-pagination-per-page brx-input,brx-pagination brx-pagination-go-to-page brx-input{align-items:center;display:flex;--input-size:var(--pagination-medium)}brx-pagination brx-pagination-per-page brx-input label,brx-pagination brx-pagination-go-to-page brx-input label{font-weight:var(--font-weight-regular);margin-bottom:0;margin-right:var(--spacing-scale-base);padding-bottom:0}brx-pagination brx-pagination-per-page brx-input input,brx-pagination brx-pagination-go-to-page brx-input input{padding-left:var(--spacing-scale-base);padding-right:calc(var(--spacing-scale-baseh) + 32px);text-align:right;width:var(--pagination-select-width)}brx-pagination brx-pagination-per-page brx-input input:not(:focus),brx-pagination brx-pagination-go-to-page brx-input input:not(:focus){border-color:transparent}brx-pagination brx-pagination-per-page brx-select .brx-select-options,brx-pagination brx-pagination-go-to-page brx-select .brx-select-options{min-width:5em;right:0;width:auto}brx-pagination brx-pagination-arrows{align-items:center;display:flex}brx-pagination brx-select brx-input brx-button{bottom:auto;position:absolute;right:var(--spacing-scale-half);top:auto;transform:none}brx-pagination brx-select brx-input brx-button .brx-button-native{margin-top:0}brx-pagination brx-divider{border-right-width:var(--divider-size);border-top:0}brx-pagination[dark-mode]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-pagination[dark-mode][dark-mode],brx-pagination[dark-mode][dark-mode] label{--color:var(--color-dark);--focus-color:var(--focus-color-dark)}brx-pagination[dark-mode] brx-pagination-item[data-mode=page][active]{--interactive-rgb:var(--active-rgb);background-color:var(--background-light);color:var(--active)}brx-pagination a{display:inline-block}brx-pagination a[data-pagination-target]:hover,brx-pagination a[data-pagination-target]:hover:not(:disabled){background-image:unset}brx-pagination[data-pagination-target]:focus{outline:none}brx-pagination[data-pagination-target].focus-visible,brx-pagination[data-pagination-target]:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}";

const DOMStrings = {
  paginationTargetTrigger: '[data-pagination-target]',
};
const BrxPagination = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxUpdate = createEvent(this, "brxUpdate", 7);
    this.brxChange = createEvent(this, "brxChange", 7);
    this.page = undefined;
    this.size = 'medium';
    this.controlledPage = TOKEN_UNCONTROLLED;
    this.currentPage = undefined;
    this.total = undefined;
  }
  get paginationItems() {
    return findTargets('brx-pagination-item', this.el);
  }
  get activePaginationItemIndex() {
    return this.paginationItems.findIndex(paginationItem => paginationItem.contains(document.activeElement));
  }
  get activePaginationItem() {
    return this.paginationItems[this.activePaginationItemIndex];
  }
  get hasTotal() {
    return typeof this.total === 'number';
  }
  async syncItems() {
    const { currentPage, paginationItems, total } = this;
    for (const paginationItem of paginationItems) {
      const target = await paginationItem.getTarget();
      if (typeof target === 'number') {
        paginationItem.active = target === this.currentPage;
        if (paginationItem.active) {
          if (this.el.contains(document.activeElement) && this.activePaginationItemIndex === -1) {
            paginationItem.focus();
          }
        }
      }
      else {
        switch (target) {
          case 'first':
          case 'prev': {
            paginationItem.disabled = currentPage === 1;
            break;
          }
          case 'next':
          case 'last': {
            paginationItem.disabled = this.hasTotal && currentPage === total;
            break;
          }
          default: {
            break;
          }
        }
        if (paginationItem.disabled) {
          const focusedElements = findTargets(':focus-visible, .focus-visible', paginationItem, ['child', 'parent', 'self']);
          for (const focusedElement of focusedElements) {
            focusedElement.blur();
            focusedElement.classList.remove('focus-visible');
          }
        }
      }
    }
  }
  handlePageChange() {
    const page = this.controlledPage !== TOKEN_UNCONTROLLED ? this.controlledPage : this.page;
    this.currentPage = page;
  }
  getTargetIndex(target) {
    if (isSpecialToken(target)) {
      switch (target) {
        case 'first': {
          return 1;
        }
        case 'prev': {
          return Math.max(this.currentPage - 1, 1);
        }
        case 'next': {
          return this.currentPage + 1;
        }
        case 'last': {
          return this.hasTotal ? this.total : -1;
        }
      }
    }
    return target;
  }
  setPage(target) {
    if (this.controlledPage === TOKEN_UNCONTROLLED) {
      const index = this.getTargetIndex(target);
      if (index !== -1) {
        this.currentPage = index;
      }
    }
    this.brxChange.emit({ target });
  }
  handleCurrentPageChange() {
    this.brxUpdate.emit({ page: this.currentPage });
  }
  handlePaginationTargetClick(event) {
    const target = event.target;
    if (target.closest(':disabled, [disabled]')) {
      return;
    }
    const trigger = target.closest(DOMStrings.paginationTargetTrigger);
    if (trigger) {
      const target = parseTarget(trigger.dataset.paginationTarget);
      this.setPage(target);
    }
  }
  connectedCallback() {
    this.handlePageChange();
  }
  // @Prop()
  // hideJumpFirst: boolean = false;
  // @Prop()
  // hideJumpPrev: boolean = false;
  // @Prop()
  // hideJumpNext: boolean = false;
  // @Prop()
  // hideJumpLast: boolean = false;
  // @Prop()
  // canJumpFirst: boolean | null = null;
  // @Prop()
  // canJumpPrev: boolean | null = null;
  // @Prop()
  // canJumpNext: boolean | null = null;
  // @Prop()
  // canJumpLast: boolean | null = null;
  // @Prop()
  // siblingCount: number | null = null;
  // @Prop()
  // boundaryCount: number | null = null;
  // @Prop()
  // count: number | null = null;
  render() {
    return (h(Host, { role: "navigation", "aria-label": "Pagina\u00E7\u00E3o de resultados." }, h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "currentPage": ["syncItems", "handleCurrentPageChange"],
    "page": ["handlePageChange"],
    "controlledPage": ["handlePageChange"]
  }; }
};
BrxPagination.style = brxPaginationCss;

export { BrxPagination as brx_pagination };
