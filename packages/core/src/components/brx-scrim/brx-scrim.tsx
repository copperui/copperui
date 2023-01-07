import { Component, Element, h, Host, Listen, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'brx-scrim',
  styleUrl: 'brx-scrim.scss',
  shadow: false,
})
export class BrxScrim {
  @Element()
  el: HTMLElement;

  @Prop({ reflect: true })
  type: 'foco' | 'legibilidade' | 'inibicao' = 'foco';

  @Prop({ reflect: true })
  active = false;

  @Prop({ reflect: true })
  closeElement: string | undefined = '[data-scrim-dismiss]';

  handleClickFoco(event: MouseEvent) {
    const closeElement = this.closeElement;
    const target = event.target as HTMLElement;

    if (target === this.el) {
      this.hideScrim();
    }

    if (closeElement && target.closest(closeElement)) {
      this.hideScrim();
    }
  }

  @Listen('click')
  handleClick(event: MouseEvent) {
    switch (this.type) {
      case 'foco': {
        this.handleClickFoco(event);
        break;
      }
      default: {
        break;
      }
    }
  }

  @Method()
  async showScrim() {
    this.active = true;
  }

  @Method()
  async hideScrim() {
    this.active = false;
  }

  render() {
    const attrs = {
      ...(this.type === 'foco'
        ? {
            ['data-scrim']: 'true',
            ['data-visible']: this.active,
            ['aria-expanded']: this.active,
          }
        : {}),
    };

    return (
      <Host {...attrs}>
        <slot></slot>
      </Host>
    );
  }
}
