import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { getControlledValue, TOKEN_UNCONTROLLED } from '../../tokens';
import { enqueueIdleCallback, findTarget, findTargets, generateUniqueId } from '../../utils/helpers';

const DOMStrings = {
  contextual: '[data-toggle="contextual"]',

  dismiss: '[data-dismiss="menu"]',

  scrim: 'brx-menu-scrim',
  folder: 'brx-menu-folder',
  item: 'brx-menu-item',

  trigger: 'brx-menu-trigger',

  panel: 'brx-menu-panel',
};

const FOCUSABLE_ELEMENTS = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';

@Component({
  tag: 'brx-menu',
  styleUrl: 'brx-menu.scss',
  shadow: false,
})
export class BrxMenu implements ComponentInterface {
  @Element()
  el: HTMLBrxMenuElement;

  @Event()
  brxChange: EventEmitter<boolean>;

  private get contextual() {
    return findTarget(DOMStrings.contextual, this.el);
  }

  @Prop()
  breakpoints: string[] = ['col-sm-4', 'col-lg-3'];

  @Prop()
  pushShadow = 'shadow-lg-right';

  @Prop({ reflect: true })
  variant: 'push' | 'contextual' | undefined;

  @Prop()
  active: boolean | undefined;

  @Prop()
  controlledActive: boolean | undefined | TOKEN_UNCONTROLLED = TOKEN_UNCONTROLLED;

  @State()
  currentActive = false;

  get isActive() {
    return this.currentActive;
  }

  @Watch('active')
  @Watch('controlledActive')
  handleActiveChange() {
    this.currentActive = getControlledValue(this.controlledActive, this.active, false);
  }

  setActive(isActive: boolean) {
    if (this.controlledActive === TOKEN_UNCONTROLLED) {
      this.currentActive = isActive;
    }

    this.brxChange.emit(isActive);
  }

  private get isPush() {
    return this.variant === 'push';
  }

  private setView() {
    const template = findTarget('body');

    const menuContextual = findTarget(DOMStrings.contextual);

    if (menuContextual && window.innerWidth < 992) {
      template.classList.add('mb-5');
    } else {
      template.classList.remove('mb-5');
    }
  }

  private setBreakpoints() {
    if (!this.isPush && !this.contextual) {
      const panel = findTarget(DOMStrings.panel, this.el);
      panel.classList.add(...this.breakpoints);
    }
  }

  @Listen('keyup', { capture: true })
  handleKeyup(event: KeyboardEvent) {
    const target = event.target as HTMLElement;

    // Fechar com tecla ESC
    switch (event.code) {
      case 'Escape': {
        this.closeMenu();
      }
      default: {
        break;
      }
    }

    const scrim = target.closest(DOMStrings.scrim);

    if (scrim) {
      this.closeMenu();
    }
  }

  @Method()
  openMenu() {
    this.setActive(true);

    if (this.isPush) {
      this.el.classList.add(...this.breakpoints, 'px-0');
    }

    this.el.focus();

    enqueueIdleCallback(() => {
      this._focusNextElement();
    });

    return Promise.resolve();
  }

  @Method()
  closeMenu() {
    this.setActive(false);

    if (this.isPush) {
      this.el.classList.remove(...this.breakpoints, 'px-0');
    }

    this._focusNextElement();

    return Promise.resolve();
  }

  @Method()
  toggleMenu() {
    if (this.isActive) {
      this.closeMenu();
    } else {
      this.openMenu();
    }

    return Promise.resolve();
  }

  private _focusNextElement() {
    // lista de elementos que desejamos focar

    if (document.activeElement) {
      const allFocusableElements = findTargets(FOCUSABLE_ELEMENTS);

      const focusable = allFocusableElements.filter(element => {
        // testa a visibilidade e inclui o elemento ativo
        return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement;
      });

      const index = focusable.indexOf(document.activeElement as any);

      if (index > -1) {
        const nextElement = focusable[index + 1] || focusable[0];
        nextElement.focus();
      }
    }
  }

  @Listen('click')
  handleDissmissClick(event: Event) {
    const target = event.target as Element;

    const dismissTrigger = target.closest(DOMStrings.dismiss);

    if (dismissTrigger) {
      this.closeMenu();
    }
  }

  @Listen('resize', { target: 'window', passive: true })
  handleWindowResize() {
    this.setView();
  }

  componentWillLoad(): void | Promise<void> {
    if (!this.el.id) {
      this.el.id = generateUniqueId();
    }

    this.handleActiveChange();
    this.setBreakpoints();
    this.setView();
  }

  connectedCallback(): void {
    this.setBreakpoints();
    this.setView();
  }

  render() {
    return (
      <Host data-active={this.currentActive ? 'true' : null}>
        <slot></slot>
      </Host>
    );
  }
}
