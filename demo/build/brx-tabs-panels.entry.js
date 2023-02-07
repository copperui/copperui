import { r as registerInstance, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { f as findTargets } from './helpers-da43c71e.js';

const brxTabsPanelsCss = "brx-tabs-panels{display:block}brx-tabs-panels brx-tabs-panel{color:var(--text-color);display:none}brx-tabs-panels brx-tabs-panel[active]{display:block}brx-tabs-panels[dark-mode]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}";

const BrxTabsPanels = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = undefined;
    this.darkMode = false;
    this.currentValue = undefined;
  }
  getPanels() {
    return Array.from(this.el.querySelectorAll('brx-tabs-panel'));
  }
  getTabsManagers() {
    return findTargets(`brx-tabs[name="${this.name}"]`);
  }
  getInitialValue() {
    const mainTabsManager = this.getTabsManagers()[0];
    return mainTabsManager === null || mainTabsManager === void 0 ? void 0 : mainTabsManager.getCurrentValue();
  }
  openPanel(value) {
    const panels = this.getPanels();
    for (const panel of panels) {
      panel.active = panel.value === value;
    }
  }
  syncPanels() {
    this.openPanel(this.currentValue);
  }
  handleCurrentValueChange() {
    this.syncPanels();
  }
  handleGlobalTabChange(event) {
    const target = event.target;
    const tabs = target.closest('brx-tabs');
    if (tabs && tabs.name === this.name) {
      const { value } = event.detail;
      this.currentValue = value;
    }
  }
  async componentWillLoad() {
    this.currentValue = await this.getInitialValue();
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "currentValue": ["handleCurrentValueChange"]
  }; }
};
BrxTabsPanels.style = brxTabsPanelsCss;

export { BrxTabsPanels as brx_tabs_panels };
