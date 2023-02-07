import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';
import { b as findTarget } from './helpers-da43c71e.js';

const brxScrimTriggerCss = "brx-scrim-trigger{display:inline-block}";

const BrxScrimTrigger = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.target = undefined;
  }
  get scrimElement() {
    return findTarget(this.target);
  }
  handleClick() {
    const scrim = this.scrimElement;
    if (scrim) {
      scrim.showScrim();
    }
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
BrxScrimTrigger.style = brxScrimTriggerCss;

export { BrxScrimTrigger as brx_scrim_trigger };
