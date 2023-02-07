import { r as registerInstance, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { C as CleanupManager } from './cleanup-87caa243.js';
import { b as findTarget, e as enqueueIdleCallback } from './helpers-da43c71e.js';

const brxTooltipCss = "brx-tooltip{display:inline-block}";

var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BrxTooltip_eventListenersCleanup;
const POSITIONS = ['top', 'right', 'bottom', 'left'];
const HIDE_EVENTS = ['mouseleave' /* , 'blur' */, 'focusout'];
const SHOW_EVENTS = ['mouseenter', 'click' /* , 'focus', */, 'focusin'];
const BrxTooltip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    _BrxTooltip_eventListenersCleanup.set(this, new CleanupManager());
    this.type = 'info';
    this.text = undefined;
    this.timer = undefined;
    this.color = 'info';
    this.place = 'top';
    this.target = undefined;
    this.active = false;
    this.popover = false;
    this.activator = null;
    this.component = null;
    this.placement = undefined;
    this.closeTimer = null;
    this.notification = false;
    this.popperInstance = null;
  }
  setupComponent() {
    const { target } = this;
    if (target) {
      this.component = findTarget(target);
    }
    const { component, color, place } = this;
    if (component) {
      component.setAttribute('color', color);
      component.setAttribute('place', place);
    }
  }
  setupNotification() {
    var _a;
    this.notification = ((_a = this.component) === null || _a === void 0 ? void 0 : _a.querySelector('brx-notification')) !== null;
  }
  setupPlacement() {
    this.placement = POSITIONS.includes(this.place) ? this.place : this.notification ? 'bottom' : 'top';
  }
  async setupPopperInstance(force = false) {
    const { activator, component } = this;
    if ((activator && component && !this.popperInstance) || force) {
      const { createPopper } = await import('./index-34c6a14c.js');
      this.popperInstance = createPopper(activator, component, {});
    }
  }
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
              altAxis: false,
              mainAxis: true, // true by default
            },
          },
        ],
        // placement: this.placement,
        placement: 'bottom',
        strategy: 'fixed',
      });
    }
    else {
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
              altAxis: true,
              // boundary: 'body',
              mainAxis: true,
              // rootBoundary: 'document',
              tether: false, // true by default
            },
          },
        ],
        placement: placement,
      });
    }
  }
  async show(event) {
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
  hide() {
    const { component } = this;
    if (component) {
      component.removeAttribute('data-show');
      component.style.zIndex = '-1';
      component.style.visibility = 'hidden';
    }
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      // this.closeTimer = null;
    }
    return Promise.resolve();
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
    const { notification, activator, component } = this;
    if (notification && activator && component) {
      setTimeout(() => {
        const ac = activator.getBoundingClientRect();
        const top = ac.top + ac.height + 10;
        component.setAttribute('style', `position: fixed !important;
          top: ${top}px !important;
          left: auto;
          right: 8px;
          display: unset;
          bottom: auto;`);
      }, 100);
    }
  }
  setupEventListeners() {
    __classPrivateFieldGet(this, _BrxTooltip_eventListenersCleanup, "f").run();
    // Ação de abrir padrao ao entrar no ativador
    if (this.activator) {
      const handleEvent = (event) => {
        this.show(event);
      };
      for (const eventName of SHOW_EVENTS) {
        this.activator.addEventListener(eventName, handleEvent);
        __classPrivateFieldGet(this, _BrxTooltip_eventListenersCleanup, "f").add(() => this.activator.removeEventListener(eventName, handleEvent));
      }
    }
    // Adiciona ação de fechar ao botao do popover
    // if (this.popover || this.notification) {
    if (this.popover) {
      const closeBtn = this.component.querySelector('.close');
      closeBtn.addEventListener('click', event => {
        this.hide();
        this._toggleActivatorIcon();
      });
      // Ação de fechar padrao ao sair do ativador
    }
    else {
      const handleHideEvent = (event) => {
        this.hide();
      };
      for (const eventName of HIDE_EVENTS) {
        this.activator.addEventListener(eventName, handleHideEvent);
        __classPrivateFieldGet(this, _BrxTooltip_eventListenersCleanup, "f").add(() => this.activator.removeEventListener(eventName, handleHideEvent));
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
  componentShouldUpdate(_newVal, _oldVal, propName) {
    switch (propName) {
      case 'target':
      case 'text': {
        return true;
      }
      default: {
        return false;
      }
    }
  }
  render() {
    // XXX: ???
    // text_tooltip.classList.add('sample')
    // if (this.activator && this.onActivator) {
    //   this.activator.appendChild(text_tooltip)
    // } else {
    //   document.body.appendChild(text_tooltip)
    // }
    const { target, text } = this;
    return (h(Host, null, h("slot", null), !target && (h("brx-tooltip-content", { ref: (el) => {
        enqueueIdleCallback(() => {
          this.component = el;
        });
      } }, h("slot", { name: "content" }, text)))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "place": ["setupComponent", "setupPlacement"],
    "color": ["setupComponent"],
    "target": ["setupComponent"],
    "component": ["setupNotification", "setupPopper"],
    "notification": ["setupPlacement", "setupPopper"],
    "placement": ["setupPopper"],
    "activator": ["setupPopper", "setupEventListeners"]
  }; }
};
_BrxTooltip_eventListenersCleanup = new WeakMap();
BrxTooltip.style = brxTooltipCss;

export { BrxTooltip as brx_tooltip };
