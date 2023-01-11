import { Component, Host, h, Prop, Fragment, Method, Element } from '@stencil/core';

@Component({
  tag: 'brx-message',
  styleUrl: 'brx-message.scss',
  shadow: false,
})
export class BrxMessage {
  @Element()
  el: HTMLElement;

  @Prop({ reflect: true })
  messageTitle: string;

  @Prop({ reflect: true })
  dismissable: boolean;

  @Prop({ reflect: true })
  variant: 'message' | 'feedback' = 'message';

  @Prop({ reflect: true })
  severity: 'success' | 'danger' | 'info' | 'warning' = 'info';

  @Method()
  async dismiss() {
    this.el.parentElement.removeChild(this.el);
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

  render() {
    const { messageTitle, iconName, dismissable } = this;

    return (
      <Host role="alert">
        {this.variant === 'feedback' && (
          <Fragment>
            <brx-icon name={iconName}></brx-icon>
            <slot></slot>
          </Fragment>
        )}

        {this.variant === 'message' && (
          <Fragment>
            <div class="brx-message-icon">
              <brx-icon name={iconName} iconClass="fa-lg"></brx-icon>
            </div>

            <div class="brx-message-content">
              {messageTitle && <span class="brx-message-title">{messageTitle}</span>}

              <span class="brx-message-body">
                <slot></slot>
              </span>
            </div>

            {dismissable && (
              <div class="brx-message-close">
                <brx-button circle size="small" aria-label="Fechar" onClick={() => this.dismiss()}>
                  <brx-icon name="fa5/fas/times"></brx-icon>
                </brx-button>
              </div>
            )}
          </Fragment>
        )}
      </Host>
    );
  }
}
