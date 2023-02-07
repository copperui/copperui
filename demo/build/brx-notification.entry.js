import { r as registerInstance, h, e as Host, g as getElement } from './index-1e49f12c.js';

const brxNotificationCss = "brx-notification{--notification-padding:var(--spacing-scale-2x) var(--spacing-scale-4x);--notification-width:50vw;--notification-height:calc(100vh - 86px);display:block;background:var(--background);box-shadow:var(--surface-shadow-md);max-height:var(--notification-height);max-width:var(--notification-width);overflow:auto;z-index:1}@media (max-width: 576px){brx-notification{--item-padding-x:var(--spacing-scale-2x);--item-padding-y:var(--spacing-scale-base);--item-padding:var(--item-padding-y) var(--item-padding-x);--notification-padding:var(--item-padding);--notification-width:100vw;min-height:var(--notification-height);overflow:hidden}brx-notification brx-tabs{--tab-size:var(--tab-small)}brx-notification brx-tabs-panels{--notification-height:calc(100vh - 86px);height:var(--notification-height);overflow-x:auto}brx-notification .status{left:var(--spacing-scale-half) !important;top:var(--spacing-scale-2x) !important}brx-notification.close{display:none}}@media (max-width: 992px){brx-notification.close{display:none}}@media (min-width: 992px){brx-notification div.close{display:none}}brx-notification .notification-header{border-bottom:1px solid var(--border-color);padding:var(--notification-padding)}brx-notification .notification-header *:last-child{margin-bottom:0}brx-notification .notification-body brx-tab{padding:0}brx-notification .notification-body brx-tabs-panels{overflow-y:auto}brx-notification .notification-body brx-tabs-panels brx-item:not([pass-styles]),brx-notification .notification-body brx-tabs-panels brx-item[pass-styles]>*{--interactive-rgb:var(--rgb-secondary-08);--item-color:var(--text-color);padding:var(--notification-padding);position:relative;white-space:normal}brx-notification .notification-body brx-tabs-panels brx-item:not([pass-styles]) .status,brx-notification .notification-body brx-tabs-panels brx-item[pass-styles]>* .status{left:var(--spacing-scale-base);position:absolute;top:var(--spacing-scale-3x)}brx-notification .notification-body brx-tabs-panels brx-item:not([pass-styles]) span,brx-notification .notification-body brx-tabs-panels brx-item[pass-styles]>* span{display:block}";

const BrxNotification = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  /**
   * Esconde a notificação relativa a referência
   * @private
   */
  _hideNotification() {
    this.el.setAttribute('hidden', '');
  }
  /**
   * Esconde todas as notificações relativa a referência
   * @private
   */
  _hideAllNotifications() {
    const notifications = Array.from(this.el.querySelectorAll('brx-item'));
    for (const notification of notifications) {
      notification.setAttribute('hidden', '');
    }
  }
  handleClick(event) {
    const target = event.target;
    const closeTrigger = target.closest('.close');
    if (closeTrigger) {
      this._dismiss();
    }
  }
  _dismiss() {
    this.el.classList.add('close');
    return Promise.resolve();
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
  get el() { return getElement(this); }
};
BrxNotification.style = brxNotificationCss;

export { BrxNotification as brx_notification };
