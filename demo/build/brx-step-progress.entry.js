import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';

const brxStepProgressCss = "brx-step-progress{display:block}";

const BrxStepProgress = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
BrxStepProgress.style = brxStepProgressCss;

export { BrxStepProgress as brx_step_progress };
