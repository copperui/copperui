import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { CleanupManager } from '../../utils/cleanup';
import { Instance as PopperInstance } from '@popperjs/core';
import { enqueueIdleCallback, findTarget } from '../../utils/helpers';

const POSITIONS = ['top', 'right', 'bottom', 'left'];

const HIDE_EVENTS = ['mouseleave', 'blur'];

const SHOW_EVENTS = ['mouseenter', 'click', 'focus'];

@Component({
  tag: 'brx-tooltip',
  styleUrl: 'brx-tooltip.scss',
  shadow: false,
})
export class BrxTooltip {
  @Element()
  el: HTMLElement;

  @Prop({ reflect: true })
  type: string = 'info';

  @Prop({ reflect: true })
  text: string | undefined;

  @Prop({ reflect: true })
  timer: number | undefined;

  @Prop({ reflect: true })
  color: string = 'info';

  @Prop({ reflect: true })
  place: 'top' | 'bottom' | 'left' | 'right' = 'top';

  @Prop({ reflect: true })
  target: string | HTMLElement | undefined;

  @Prop({ reflect: true })
  active: boolean = false;

  @Prop({ reflect: true })
  popover: boolean = false;

  @State()
  activator: HTMLElement | null = null;

  @State()
  component: HTMLElement | null = null;

  @State()
  placement: 'bottom' | 'top' | 'right' | 'left';

  @State()
  closeTimer: any | null = null;

  @State()
  notification: boolean = false;

  @State()
  popperInstance: PopperInstance | null = null;

  #eventListenersCleanup = new CleanupManager();

  @Watch('place')
  @Watch('color')
  @Watch('target')
  setupComponent() {
    const target = this.target;

    if (target) {
      this.component = findTarget(target);
    }

    const { component, color, place } = this;

    if (component) {
      component.setAttribute('color', color);
      component.setAttribute('place', place);
    }
  }

  @Watch('component')
  setupNotification() {
    this.notification = this.component?.querySelector('brx-notification') !== null;
  }

  @Watch('place')
  @Watch('notification')
  setupPlacement() {
    this.placement = POSITIONS.includes(this.place) ? this.place : this.notification ? 'bottom' : 'top';
  }

  async setupPopperInstance(force = false) {
    const { activator, component } = this;

    if ((activator && component && !this.popperInstance) || force) {
      const { createPopper } = await import('@popperjs/core');
      this.popperInstance = createPopper(activator, component, {});
    }
  }

  @Watch('component')
  @Watch('notification')
  @Watch('placement')
  @Watch('activator')
  async setupPopper() {
    const { activator, component, notification } = this;
    let placement = this.placement;

    if ([activator, component, notification, placement].some(i => i === undefined || i === null)) {
      return;
    }

    component.removeAttribute('notification');

    await this.setupPopperInstance();

    if (notification) {
      component.setAttribute('notification', '');

      this.popperInstance.setOptions({
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
          {
            name: 'preventOverflow',
            options: {
              altAxis: false, // false by default
              mainAxis: true, // true by default
            },
          },
        ],
        // placement: this.placement,
        placement: 'bottom',
        strategy: 'fixed',
      });
    } else {
      const ac = activator.getBoundingClientRect();
      const tt = component.getBoundingClientRect();
      const bw = document.body.clientWidth;

      if (placement === 'right') {
        placement = ac.x + ac.width + tt.width > bw ? 'top' : placement;
      }

      if (placement === 'left') {
        placement = ac.x - tt.width > 0 ? placement : 'top';
      }

      this.popperInstance.setOptions({
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
          {
            name: 'preventOverflow',
            options: {
              altAxis: true, // false by default
              // boundary: 'body',
              mainAxis: true, // true by default
              // rootBoundary: 'document',
              tether: false, // true by default
            },
          },
        ],
        placement: placement,
      });
    }
  }

  async show(event: Event) {
    await this.setupPopper();

    const { place, component } = this;

    if (place && component) {
      place && component.setAttribute('place', place);

      component.style.display = 'unset';
      component.setAttribute('data-show', '');
      component.style.zIndex = '9999';

      this._fixPosition();

      // Importante pois "display: none" conflitua com a instancia do componente e precisa ser setado aqui já que pelo css ativa o efeito fade no primeiro carregamento
      component.style.visibility = 'visible';

      const { timer, hide, closeTimer } = this;

      if (timer) {
        clearTimeout(closeTimer);

        this.closeTimer = setTimeout(hide, timer, event, component);
      }
    }
  }

  hide(_event: Event) {
    this.component.removeAttribute('data-show');
    this.component.style.zIndex = '-1';
    this.component.style.visibility = 'hidden';

    clearTimeout(this.closeTimer);
  }

  _toggleActivatorIcon() {
    // XXX: ???

    const icon = this.activator.querySelector('button svg');

    if (icon) {
      icon.classList.toggle('fa-angle-down');
      icon.classList.toggle('fa-angle-up');
    }

    this.activator.toggleAttribute('active');
  }

  _fixPosition() {
    if (this.notification) {
      setTimeout(() => {
        const ac = this.activator.getBoundingClientRect();

        const top = ac.top + ac.height + 10;

        this.component.setAttribute(
          'style',
          `position: fixed !important;
          top: ${top}px !important;
          left: auto;
          right: 8px;
          display: unset;
          bottom: auto;`,
        );
      }, 100);
    }
  }

  @Watch('activator')
  setupEventListeners() {
    this.#eventListenersCleanup.run();

    // Ação de abrir padrao ao entrar no ativador
    if (this.activator) {
      const handleEvent = (otherEvent: Event) => {
        this.show(otherEvent);
      };

      for (const eventName of SHOW_EVENTS) {
        this.activator.addEventListener(eventName, handleEvent);
        this.#eventListenersCleanup.add(() => this.activator.removeEventListener(eventName, handleEvent));
      }
    }
    // Adiciona ação de fechar ao botao do popover
    // if (this.popover || this.notification) {
    if (this.popover) {
      const closeBtn = this.component.querySelector('.close');

      closeBtn.addEventListener('click', event => {
        this.hide(event);
        this._toggleActivatorIcon();
      });

      // Ação de fechar padrao ao sair do ativador
    } else {
      const handleEvent = (otherEvent: Event) => {
        this.hide(otherEvent);
      };

      for (const eventName of HIDE_EVENTS) {
        this.activator.addEventListener(eventName, handleEvent);
        this.#eventListenersCleanup.add(() => this.activator.removeEventListener(eventName, handleEvent));
      }
    }
  }

  connectedCallback() {
    this.activator = this.el;

    enqueueIdleCallback(() => {
      this.setupPlacement();
      this.setupComponent();
    });
  }

  render() {
    // XXX: ???
    // text_tooltip.classList.add('sample')
    // if (this.activator && this.onActivator) {
    //   this.activator.appendChild(text_tooltip)
    // } else {
    //   document.body.appendChild(text_tooltip)
    // }

    return (
      <Host>
        <slot></slot>

        {!this.target && (
          <brx-tooltip-content
            ref={(el: HTMLElement) => {
              enqueueIdleCallback(() => {
                this.component = el;
              });
            }}
          >
            <slot name="content">{this.text}</slot>
          </brx-tooltip-content>
        )}
      </Host>
    );
  }
}
