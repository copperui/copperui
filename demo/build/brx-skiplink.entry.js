import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';

const brxSkiplinkCss = "brx-skiplink{display:block;--skiplink-layer:var(--z-index-layer-4);--skiplink-margin:var(--spacing-scale-2x);--skiplink-min-width:300px;--skiplink-shadow:var(--surface-shadow-lg);--skiplink-duration:150ms;--skiplink-timing-function:ease-out;display:inline-flex;flex-direction:column;left:var(--skiplink-margin);position:fixed;top:0;z-index:var(--skiplink-layer)}brx-skiplink a{display:block;height:auto;align-items:center;background-color:var(--background);box-shadow:var(--skiplink-shadow);display:inline-flex;min-width:var(--skiplink-min-width);position:absolute;top:-100vh;transition:top var(--skiplink-duration) var(--skiplink-timing-function);white-space:nowrap;width:auto}brx-skiplink a:focus,brx-skiplink a:focus-visible{top:0}brx-skiplink[full]{box-shadow:var(--skiplink-shadow);flex-direction:row;top:-100vh;transition:top var(--skiplink-duration) var(--skiplink-timing-function)}brx-skiplink[full] a{box-shadow:none;min-width:0;position:relative;top:0}brx-skiplink[full]:focus-within{top:0}";

const BrxSkiplink = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.full = undefined;
  }
  render() {
    return (h(Host, { role: "navigation" }, h("slot", null)));
  }
};
BrxSkiplink.style = brxSkiplinkCss;

export { BrxSkiplink as brx_skiplink };
