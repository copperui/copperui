import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { getControlledValue, TOKEN_UNCONTROLLED } from '../../tokens';
import { ScrimChangeEventDetail } from './brx-scrim-interface';

const DOMStrings = {
  closeElement: '[data-scrim-dismiss]',
};

@Component({
  tag: 'brx-scrim',
  styleUrl: 'brx-scrim.scss',
  shadow: false,
})
export class BrxScrim {
  @Element()
  el: HTMLElement;

  @Event()
  brxScrimChange: EventEmitter<ScrimChangeEventDetail>;

  @Prop()
  active: boolean;

  @Prop()
  controlledActive: boolean | TOKEN_UNCONTROLLED = TOKEN_UNCONTROLLED;

  @State()
  currentActive = false;

  @Watch('active')
  @Watch('controlledActive')
  syncCurrentActiveFromProps() {
    this.currentActive = getControlledValue(this.controlledActive, this.active, false);
  }

  setActive(isActive: boolean) {
    if (this.controlledActive === TOKEN_UNCONTROLLED) {
      this.currentActive = isActive;
    }

    this.brxScrimChange.emit({ active: isActive });
  }

  @Prop({ reflect: true })
  type: 'foco' | 'legibilidade' | 'inibicao' = 'foco';

  @Prop()
  closeElement = DOMStrings.closeElement;

  @Method()
  async showScrim() {
    this.setActive(true);
  }

  @Method()
  async hideScrim() {
    this.setActive(false);
  }

  handleClickFoco(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.closest('brx-scrim') !== this.el) {
      return;
    }

    if (target === this.el) {
      this.hideScrim();
    }

    const closeElement = this.closeElement;

    const closeElementTrigger = closeElement && target.closest(closeElement);

    if (closeElementTrigger && !closeElementTrigger.hasAttribute('disabled')) {
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

  get baseAttributes() {
    switch (this.type) {
      case 'foco': {
        return {
          ['data-scrim']: 'true',
          ['data-visible']: this.currentActive,
          ['aria-expanded']: this.currentActive,
        };
      }

      default: {
        return {};
      }
    }
  }

  render() {
    return (
      <Host {...this.baseAttributes} data-active={this.currentActive ? true : null}>
        <slot></slot>
      </Host>
    );
  }
}
