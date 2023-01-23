import { Component, Element, h, Host, Listen, Method } from '@stencil/core';

@Component({
  tag: 'brx-notification',
  styleUrl: 'brx-notification.scss',
  shadow: false,
})
export class BrxNotification {
  @Element()
  el: HTMLElement;

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

  @Listen('click', { passive: true })
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const closeTrigger = target.closest('.close');

    if (closeTrigger) {
      this._dismiss();
    }
  }

  @Method()
  _dismiss() {
    this.el.classList.add('close');

    return Promise.resolve();
  }

  @Listen('')
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
