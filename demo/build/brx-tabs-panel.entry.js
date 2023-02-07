import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';

const brxTabsPanelCss = "";

const BrxTabsPanel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.active = false;
    this.value = undefined;
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
BrxTabsPanel.style = brxTabsPanelCss;

export { BrxTabsPanel as brx_tabs_panel };
