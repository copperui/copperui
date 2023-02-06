import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { TOKEN_UNCONTROLLED } from '../../tokens';
import { ScrimChangeEventDetail } from './brx-scrim-interface';

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
  active: boolean | undefined;

  @Prop()
  controlledActive: boolean | undefined;

  @State()
  currentActive = false;

  @Watch('active')
  @Watch('controlledActive')
  syncCurrentActiveFromProps() {
    const targetValue = this.controlledActive !== TOKEN_UNCONTROLLED ? this.controlledActive : this.active;
    this.currentActive = targetValue ?? false;
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
  closeElement: string | undefined = '[data-scrim-dismiss]';

  @Method()
  async showScrim() {
    this.setActive(true);
  }

  @Method()
  async hideScrim() {
    this.setActive(false);
  }

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
      <Host {...this.baseAttributes}>
        <slot></slot>
      </Host>
    );
  }
}
