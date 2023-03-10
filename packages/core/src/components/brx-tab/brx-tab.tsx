import { Component, Host, h, Prop, ComponentInterface, Method, Element } from '@stencil/core';

@Component({
  tag: 'brx-tab',
  styleUrl: 'brx-tab.scss',
  shadow: false,
})
export class BrxTab implements ComponentInterface {
  @Element()
  el: HTMLElement;

  @Prop({ reflect: true })
  counter: boolean;

  @Prop()
  label: string | undefined;

  @Prop({ reflect: true })
  value: string | undefined;

  @Prop()
  iconName: string;

  @Prop()
  tabTitle: string;

  @Prop()
  tooltipText: string | undefined;

  @Method()
  setActive(active: boolean) {
    if (active) {
      this.el.setAttribute('active', '');
    } else {
      this.el.removeAttribute('active');
    }

    return Promise.resolve();
  }

  render() {
    const { tabTitle, iconName, label, tooltipText } = this;

    return (
      <Host role="listitem" title={tabTitle}>
        <brx-tooltip-auto tooltip-text={tooltipText}>
          <button type="button" aria-label={label ?? tooltipText}>
            <span class="name">
              <span class="d-flex flex-column flex-sm-row">
                <slot name="icon">
                  {iconName && (
                    <span class="icon mb-1 mb-sm-0 mr-sm-1">
                      <brx-icon name={iconName}></brx-icon>
                    </span>
                  )}
                </slot>
                {tabTitle && <span class="name">{tabTitle}</span>}
              </span>
            </span>
          </button>
          <slot></slot>
          <span class="brx-tab-results">
            <slot name="results"></slot>
          </span>
        </brx-tooltip-auto>
      </Host>
    );
  }
}
