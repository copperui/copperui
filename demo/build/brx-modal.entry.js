import { r as registerInstance, h, e as Host } from './index-1e49f12c.js';

const brxModalCss = "brx-modal{--modal-size:var(--modal-medium);--modal-xsmall:220px;--modal-small:300px;--modal-medium:500px;--modal-large:640px;--modal-auto:auto;background:var(--background);box-shadow:var(--surface-shadow-sm);display:flex;flex-direction:column;max-width:var(--modal-size);z-index:var(--z-index-layer-4)}brx-modal brx-modal-header{display:block;font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-bold);padding:var(--spacing-scale-2x) var(--spacing-scale-2x) 0;position:relative}brx-modal brx-modal-header [data-scrim-dismiss]{position:absolute;right:var(--spacing-scale-base);top:var(--spacing-scale-base)}brx-modal .brx-modal-title{font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-bold);margin-right:40px;max-height:calc(var(--font-size-scale-up-01) * 3);overflow:hidden;text-overflow:ellipsis}brx-modal brx-modal-body{display:block;flex:1;margin:var(--spacing-scale-3x) 0 var(--spacing-scale-2x);overflow:auto;padding:0 var(--spacing-scale-2x)}brx-modal brx-modal-body::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-modal brx-modal-body::-webkit-scrollbar-track{background:var(--gray-10)}brx-modal brx-modal-body::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-modal brx-modal-body:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}brx-modal brx-modal-body *:last-child{margin-bottom:0}brx-modal brx-modal-footer{display:flex;flex-wrap:wrap;padding:var(--spacing-scale-2x)}brx-modal[size=xsmall]{--modal-size:var(--modal-xsmall)}brx-modal[size=small]{--modal-size:var(--modal-small)}brx-modal[size=medium]{--modal-size:var(--modal-medium)}brx-modal[size=large]{--modal-size:var(--modal-large)}brx-modal[size=auto]{--modal-size:var(--modal-auto)}brx-modal brx-loading[size=medium]{min-height:calc(var(--loading-indetermined-diameter-md) + var(--spacing-scale-2x) * 2)}brx-modal .terms{border:0;box-shadow:var(--surface-shadow-sm-inset), var(--surface-shadow-sm-inset-up);font-size:var(--font-size-scale-base);height:216px;margin-bottom:var(--spacing-scale-2x);margin-left:calc(var(--spacing-scale-2x) * -1);margin-right:calc(var(--spacing-scale-2x) * -1);overflow:auto;padding:var(--spacing-scale-2x);resize:none;width:auto}brx-modal .terms::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-modal .terms::-webkit-scrollbar-track{background:var(--gray-10)}brx-modal .terms::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-modal .terms:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}brx-modal .terms:active{outline:none}brx-modal .terms:hover::-webkit-scrollbar-thumb{background:var(--color-secondary-07)}@media (max-width: 991px){brx-modal .terms{margin-left:unset !important;margin-right:unset !important}brx-modal brx-modal-header [data-scrim-dismiss]{top:0}}";

const BrxModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = undefined;
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
BrxModal.style = brxModalCss;

export { BrxModal as brx_modal };
