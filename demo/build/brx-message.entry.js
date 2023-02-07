import { r as registerInstance, h, e as Host, F as Fragment, g as getElement } from './index-1e49f12c.js';

const brxMessageCss = "brx-message[variant=message]{--message-background:var(--background);--message-color-icon:var(--color);--feedback-background:var(--background);--message-text:var(--color);background:var(--message-background);display:flex;margin-bottom:var(--spacing-scale-2x)}brx-message[variant=message] .brx-message-content{color:var(--message-text);flex:1;font-size:var(--font-size-scale-up-01);padding:var(--spacing-scale-3x) var(--spacing-scale-base) var(--spacing-scale-3x) var(--spacing-scale-2x)}brx-message[variant=message] .brx-message-content .brx-message-title{font-weight:var(--font-weight-semi-bold)}brx-message[variant=message] .brx-message-content .brx-message-body{font-weight:var(--font-weigth-regular)}brx-message[variant=message] .brx-message-content a{font-weight:var(--font-weight-bold);text-decoration:underline}brx-message[variant=message] .brx-message-content *:last-child{margin-bottom:0}brx-message[variant=message] .brx-message-icon{align-items:center;color:var(--message-color-icon);display:flex;justify-content:center;margin:var(--spacing-vertical-center) var(--spacing-scale-2x);padding-left:var(--spacing-scale-2x);padding-right:var(--spacing-scale-2x)}brx-message[variant=message] .brx-message-icon+.content{padding-left:0}brx-message[variant=message] .brx-message-close{margin-right:var(--spacing-scale-base);margin-top:var(--spacing-scale-base)}brx-message[variant=message][severity=success]{--message-background:var(--success-alternative);--feedback-background:var(--success);--message-color-icon:var(--success)}brx-message[variant=message][severity=success] .brx-message-close brx-button{--interactive:var(--message-color-icon);--interactive-rgb:var(--success-rgb)}brx-message[variant=message][severity=danger]{--message-background:var(--danger-alternative);--feedback-background:var(--danger);--message-color-icon:var(--danger)}brx-message[variant=message][severity=danger] .brx-message-close brx-button{--interactive:var(--message-color-icon);--interactive-rgb:var(--danger-rgb)}brx-message[variant=message][severity=info]{--message-background:var(--info-alternative);--feedback-background:var(--info);--message-color-icon:var(--info)}brx-message[variant=message][severity=info] .brx-message-close brx-button{--interactive:var(--message-color-icon);--interactive-rgb:var(--info-rgb)}brx-message[variant=message][severity=warning]{--message-background:var(--warning-alternative);--feedback-background:var(--warning)}brx-message[variant=message][severity=warning] .brx-message-close brx-button{--interactive:var(--color);--interactive-rgb:var(--color-rgb)}brx-message[variant=feedback]{--message-background:var(--background);--message-color-icon:var(--color);--feedback-background:var(--background);--message-text:var(--color);align-items:center;background:var(--feedback-background);color:var(--message-text);display:inline-flex;font-style:italic;font-weight:var(--font-weight-medium);margin-bottom:0;padding:var(--spacing-scale-half)}brx-message[variant=feedback] .svg-inline--fa,brx-message[variant=feedback] .fa,brx-message[variant=feedback] .fab,brx-message[variant=feedback] .fad,brx-message[variant=feedback] .fal,brx-message[variant=feedback] .far,brx-message[variant=feedback] .fas{margin-right:var(--spacing-scale-half)}brx-message[variant=feedback]:not([severity=warning]){--message-text:var(--pure-0)}brx-message[variant=feedback][severity=warning]{--color:var(--color-light);--color-rgb:var(--color-light-rgb);--text-color:var(--color);--interactive:var(--interactive-light);--interactive-rgb:var(--interactive-light-rgb);--visited:var(--visited-light);--hover:var(--hover-light);--pressed:var(--pressed-light);--focus-color:var(--focus-color-light);--focus:var(--focus-color)}brx-message[variant=feedback][severity=success]{--message-background:var(--success-alternative);--feedback-background:var(--success);--message-color-icon:var(--success)}brx-message[variant=feedback][severity=success] .brx-message-close brx-button{--interactive:var(--message-color-icon);--interactive-rgb:var(--success-rgb)}brx-message[variant=feedback][severity=danger]{--message-background:var(--danger-alternative);--feedback-background:var(--danger);--message-color-icon:var(--danger)}brx-message[variant=feedback][severity=danger] .brx-message-close brx-button{--interactive:var(--message-color-icon);--interactive-rgb:var(--danger-rgb)}brx-message[variant=feedback][severity=info]{--message-background:var(--info-alternative);--feedback-background:var(--info);--message-color-icon:var(--info)}brx-message[variant=feedback][severity=info] .brx-message-close brx-button{--interactive:var(--message-color-icon);--interactive-rgb:var(--info-rgb)}brx-message[variant=feedback][severity=warning]{--message-background:var(--warning-alternative);--feedback-background:var(--warning)}brx-message[variant=feedback][severity=warning] .brx-message-close brx-button{--interactive:var(--color);--interactive-rgb:var(--color-rgb)}";

const BrxMessage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.messageTitle = undefined;
    this.dismissable = undefined;
    this.variant = 'message';
    this.severity = 'info';
  }
  get iconName() {
    switch (this.severity) {
      case 'danger': {
        return 'fa5/fas/times-circle';
      }
      case 'success': {
        return 'fa5/fas/check-circle';
      }
      case 'info': {
        return 'fa5/fas/info-circle';
      }
      case 'warning': {
        return 'fa5/fas/exclamation-triangle';
      }
    }
  }
  async dismiss() {
    this.el.parentElement.removeChild(this.el);
  }
  render() {
    const { messageTitle, iconName, dismissable } = this;
    return (h(Host, { role: "alert" }, this.variant === 'feedback' && (h(Fragment, null, h("brx-icon", { name: iconName }), h("slot", null))), this.variant === 'message' && (h(Fragment, null, h("div", { class: "brx-message-icon" }, h("brx-icon", { name: iconName, iconClass: "fa-lg" })), h("div", { class: "brx-message-content" }, messageTitle && h("span", { class: "brx-message-title" }, messageTitle), h("span", { class: "brx-message-body" }, h("slot", null))), dismissable && (h("div", { class: "brx-message-close" }, h("brx-button", { circle: true, size: "small", "aria-label": "Fechar", onClick: () => this.dismiss() }, h("brx-icon", { name: "fa5/fas/times" }))))))));
  }
  get el() { return getElement(this); }
};
BrxMessage.style = brxMessageCss;

export { BrxMessage as brx_message };
