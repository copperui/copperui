import { Component, Host, h, Prop, Watch, Method, Element, ComponentInterface } from '@stencil/core';

@Component({
  tag: 'brx-card',
  styleUrl: 'brx-card.scss',
  shadow: false,
})
export class BrxCard implements ComponentInterface {
  @Element()
  el: HTMLBrxCardElement;

  @Prop({ reflect: true })
  hFixed: boolean = false;

  @Prop({ reflect: true })
  hover: boolean = false;

  @Prop({ reflect: true })
  darkMode: boolean = false;

  @Prop({ reflect: true })
  disabled: boolean = false;

  @Watch('disabled')
  watchDisabled() {
    this.syncDisabledState();
  }

  @Method()
  async syncDisabledState() {
    const { disabled } = this;

    const elements = Array.from(this.el.querySelectorAll('button, input, select, textarea'));

    for (const element of elements) {
      if (disabled) {
        element.setAttribute('disabled', 'disabled');
      } else {
        element.removeAttribute('disabled');
      }
    }
  }

  componentDidLoad(): void {
    this.syncDisabledState();
  }

  render() {
    const hostProps = {
      ...(this.disabled ? { 'aria-hidden': 'true' } : {}),
    };

    return (
      <Host {...hostProps}>
        <slot></slot>
      </Host>
    );
  }
}
