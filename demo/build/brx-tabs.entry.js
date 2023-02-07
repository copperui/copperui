import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { T as TOKEN_UNCONTROLLED } from './tokens-3a672c03.js';
import { b as findTarget, f as findTargets, g as getWindow } from './helpers-da43c71e.js';

const brxTabsCss = "brx-tabs{--tab-padding:var(--spacing-scale-3x);--tab-size:var(--tab-medium);--tab-large:var(--spacing-scale-3x);--tab-medium:var(--spacing-scale-2x);--tab-small:var(--spacing-scale-base)}brx-tabs .brx-tabs-nav{overflow-x:auto;width:100%}brx-tabs .brx-tabs-nav::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-tabs .brx-tabs-nav::-webkit-scrollbar-track{background:var(--gray-10)}brx-tabs .brx-tabs-nav::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-tabs .brx-tabs-nav:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}@media (max-width: 991px){brx-tabs .brx-tabs-nav{display:flex;overflow-x:auto;width:100%}brx-tabs .brx-tabs-nav::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-tabs .brx-tabs-nav::-webkit-scrollbar-track{background:var(--gray-10)}brx-tabs .brx-tabs-nav::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-tabs .brx-tabs-nav:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}}brx-tabs .brx-tabs-nav ul{border-bottom:1px solid var(--border-color);display:flex;margin-bottom:0;margin-top:0;padding:0;flex:1}brx-tabs brx-tab .brx-tooltip-auto-container{align-items:center;display:flex;justify-content:center;white-space:nowrap;position:relative}brx-tabs brx-tab .brx-tooltip-auto-container:first-child{padding-left:0}brx-tabs brx-tab .brx-tooltip-auto-container:last-child{padding-right:0}brx-tabs brx-tab button,brx-tabs brx-tab a{--focus-offset:calc(var(--spacing-scale-half) * -1);background-color:transparent;border:0;border-bottom:4px solid transparent;color:var(--color);display:inline-block;font-size:var(--font-size-scale-up-02);font-weight:var(--font-weight-medium);line-height:1;padding:var(--tab-size) var(--tab-padding);text-align:center;white-space:nowrap}brx-tabs brx-tab button:focus,brx-tabs brx-tab a:focus{outline:none}brx-tabs brx-tab button.focus-visible,brx-tabs brx-tab button:focus-visible,brx-tabs brx-tab a.focus-visible,brx-tabs brx-tab a:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-tabs brx-tab button:not([data-disable-hover-interaction]):not(:disabled):hover,brx-tabs brx-tab a:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-tabs brx-tab[active] button{border-bottom:4px solid var(--active);color:var(--active)}brx-tabs brx-tab[active] .brx-tab-results{--font-weight:var(--font-weight-semi-bold);color:var(--active)}brx-tabs .brx-tab-results{display:flex;font-weight:var(--font-weight);justify-content:center;margin-top:var(--spacing-scale-2x);position:absolute;top:100%}brx-tabs:not([counter]) .brx-tab-results{display:none}brx-tabs[counter] .brx-tabs-nav ul{margin-bottom:calc(var(--spacing-scale-2x) + var(--font-size-scale-up-02) + var(--spacing-scale-base))}brx-tabs[size=small]{--tab-size:var(--tab-small)}brx-tabs[size=medium]{--tab-size:var(--tab-medium)}brx-tabs[size=large]{--tab-size:var(--tab-large)}brx-tabs[dark-mode]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-tabs[dark-mode] brx-tab[active] button{border-bottom-color:var(--background-light);color:var(--color)}";

const BrxTabs = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxTabClick = createEvent(this, "brxTabClick", 7);
    this.brxTabChange = createEvent(this, "brxTabChange", 7);
    this.name = undefined;
    this.counter = false;
    this.size = 'medium';
    this.darkMode = false;
    this.value = undefined;
    this.controlledValue = TOKEN_UNCONTROLLED;
    this.currentValue = undefined;
  }
  get navEl() {
    return findTarget('.brx-tabs-nav', this.el);
  }
  get tabItems() {
    return findTargets('brx-tab', this.el);
  }
  syncCurrentValueFromProps() {
    var _a;
    const incomingValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
    this.currentValue = incomingValue !== null && incomingValue !== void 0 ? incomingValue : (_a = this.activeTabItem) === null || _a === void 0 ? void 0 : _a.value;
  }
  setCurrentValue(value) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = value;
    }
    this.brxTabChange.emit({ value: this.currentValue });
  }
  async getCurrentValue() {
    return this.currentValue;
  }
  get height() {
    return this.navEl.clientHeight;
  }
  get scrollsizes() {
    return this.navEl.scrollHeight - this.navEl.clientHeight;
  }
  get activeTabItemIndex() {
    return this.tabItems.findIndex(tab => tab.hasAttribute('active'));
  }
  get activeTabItem() {
    var _a;
    const { activeTabItemIndex } = this;
    return (_a = this.tabItems[activeTabItemIndex]) !== null && _a !== void 0 ? _a : null;
  }
  get focusedTabItemIndex() {
    return Math.max(this.tabItems.findIndex(i => i.querySelector('.focus-visible') !== null), 0);
  }
  get scrollHeight() {
    const doc = getWindow().document;
    return Math.max(this.el.scrollWidth, doc.documentElement.scrollWidth, this.el.offsetWidth, doc.documentElement.offsetWidth, this.el.clientWidth, doc.documentElement.clientWidth);
  }
  get leftPosition() {
    return this.el.offsetWidth - 1;
  }
  setBehavior() {
    const anchor = this.navEl;
    anchor.style.setProperty('--height-nav', `${this.height}px`);
    anchor.style.setProperty('--right-gradient-nav', `${this.leftPosition}px`);
    this.positionScroll(anchor);
    this.navigationRight += 4;
    if (this.navigationRight <= this.lastItemPosition - 5) {
      anchor.classList.add('brx-tabs-nav-right');
    }
    anchor.addEventListener('scroll', () => {
      this.positionScroll(anchor);
      if (this.navigationLeft <= 0) {
        anchor.classList.add('brx-tabs-nav-left');
      }
      else {
        anchor.classList.remove('brx-tabs-nav-left');
      }
      if (this.navigationRight <= this.lastItemPosition - 5) {
        anchor.classList.add('brx-tabs-nav-right');
      }
      else {
        anchor.classList.remove('brx-tabs-nav-right');
      }
    });
  }
  positionScroll(anchor) {
    const tabItems = this.tabItems;
    this.lastItemPosition = Math.ceil(tabItems[tabItems.length - 1].getBoundingClientRect().right);
    this.navigationLeft = Math.floor(tabItems[0].getBoundingClientRect().left);
    this.navigationRight = Math.floor(anchor.getBoundingClientRect().right);
  }
  openTab(value) {
    const tabs = this.tabItems;
    for (const tab of tabs) {
      tab.setActive(tab.value === value);
    }
  }
  syncTabs() {
    this.openTab(this.currentValue);
  }
  handleCurrentValueChange() {
    this.syncTabs();
  }
  clean() {
    for (const tab of this.tabItems) {
      const button = tab.querySelector('button');
      button.classList.remove('focus-visible');
      tab.setActive(false);
    }
  }
  hiddenTooltips() {
    const tooltips = findTargets('brx-tooltip', this.el);
    for (const tooltip of tooltips) {
      tooltip.hide();
    }
  }
  handleKeyupEvent(event) {
    const jumpToIndex = (targetIndex) => {
      event.preventDefault();
      const tab = this.tabItems[targetIndex];
      if (tab) {
        this.openTab(tab.value);
        const button = tab.querySelector('button');
        button.focus();
      }
      event.stopPropagation();
    };
    const rotateFocus = (direction) => {
      event.preventDefault();
      const { focusedTabItemIndex } = this;
      const targetIndex = focusedTabItemIndex + direction;
      const tab = this.tabItems[targetIndex];
      if (tab) {
        const button = tab.querySelector('button');
        button.focus();
      }
      event.stopPropagation();
    };
    switch (event.key) {
      case 'End': {
        jumpToIndex(this.tabItems.length - 1);
        break;
      }
      case 'Home': {
        jumpToIndex(0);
        break;
      }
      case 'ArrowLeft': {
        rotateFocus(-1);
        break;
      }
      case 'ArrowRight': {
        rotateFocus(1);
        break;
      }
      case 'Tab': {
        rotateFocus(0);
        break;
      }
      case ' ': {
        event.preventDefault();
        this.hiddenTooltips();
        const target = event.target;
        target.click();
        event.stopPropagation();
        break;
      }
      default: {
        break;
      }
    }
  }
  handleTabClick(event) {
    const target = event.target;
    const tabTrigger = target.closest('brx-tab button');
    if (tabTrigger) {
      const tab = tabTrigger.closest('brx-tab');
      const { value } = tab;
      this.setCurrentValue(value);
      this.brxTabClick.emit({ value });
    }
  }
  handleFocusOut() {
    this.hiddenTooltips();
  }
  handleKeyUp(event) {
    this.handleKeyupEvent(event);
  }
  componentWillLoad() {
    this.syncCurrentValueFromProps();
  }
  componentShouldUpdate(_, __, propName) {
    switch (propName) {
      case 'currentValue': {
        return false;
      }
      default: {
        return true;
      }
    }
  }
  render() {
    return (h(Host, null, h("nav", { class: "brx-tabs-nav" }, h("ul", null, h("slot", null)))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["syncCurrentValueFromProps"],
    "controlledValue": ["syncCurrentValueFromProps"],
    "currentValue": ["handleCurrentValueChange"]
  }; }
};
BrxTabs.style = brxTabsCss;

export { BrxTabs as brx_tabs };
