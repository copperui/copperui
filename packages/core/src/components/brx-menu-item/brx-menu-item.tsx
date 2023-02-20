import { Component, ComponentInterface, Element, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'brx-menu-item',
  styleUrl: 'brx-menu-item.scss',
  shadow: false,
})
export class BrxMenuItem implements ComponentInterface {
  @Element()
  el: HTMLBrxMenuItemElement;

  @State()
  iconName: string;

  @Prop()
  initialSetup = true;

  private get parentElement() {
    return this.el.parentElement;
  }

  private get nextListEl() {
    const nextElementSibling = this.el.nextElementSibling;
    return nextElementSibling?.matches('ul') ? nextElementSibling : null;
  }

  private get isParentMenuFolder() {
    return this.parentElement?.matches('brx-menu-folder');
  }

  private get isParentDropMenu() {
    return this.parentElement?.matches('.brx-drop-menu');
  }

  private get isParentSideMenu() {
    return this.parentElement?.matches('.brx-side-menu');
  }

  @Method()
  setupParent() {
    const parentEl = this.parentElement;

    if (parentEl) {
      if (this.isParentMenuFolder) {
        parentEl.classList.add('brx-drop-menu');

        this.iconName = 'chevron-down';
      } else {
        if (this.nextListEl) {
          parentEl.classList.add('brx-side-menu');
          this.iconName = 'angle-right';
        }
      }
    }

    return Promise.resolve();
  }

  openParent() {
    const parentEl = this.parentElement;
    parentEl.dataset.active = 'true';
  }

  closeParent() {
    const parentEl = this.parentElement;
    delete parentEl.dataset.active;
  }

  get isParentOpen() {
    return Boolean(this.parentElement.dataset.active ?? false);
  }

  toggleParent() {
    if (this.isParentOpen) {
      this.closeParent();
    } else {
      this.openParent();
    }
  }

  private hideItems(element: Element) {
    const brxMenuBody = element.closest('brx-menu-body');
    const brxMenuItems = Array.from(brxMenuBody.querySelectorAll('brx-menu-item'));

    for (const item of brxMenuItems) {
      item.hide();
    }
  }

  private showItems(element: Element) {
    const brxMenuItems = Array.from(element.querySelectorAll('brx-menu-item'));

    for (const item of brxMenuItems) {
      item.show();
    }
  }

  private closeSideMenu() {
    this.closeParent();
    const parentFolder = this.el.parentElement.closest('.brx-side-menu[data-active]') ?? this.el.closest('brx-menu-body');
    this.showItems(parentFolder);
  }

  @Method()
  hide() {
    this.el.setAttribute('hidden', '');
    return Promise.resolve();
  }

  @Method()
  show() {
    this.el.removeAttribute('hidden');
    return Promise.resolve();
  }

  @Watch('iconName')
  private syncContainerIcon() {
    const container = this.el?.querySelector('.brx-menu-item-container');

    if (container) {
      if (!container.querySelector('.support brx-icon')) {
        const support = document.createElement('span');
        support.classList.add('support');

        const icon = document.createElement('brx-icon');
        icon.setAttribute('name', this.iconName);

        support.appendChild(icon);
        container.appendChild(support);
      }
    }
  }

  handleToggleDropMenu() {
    this.toggleParent();
  }

  handleToggleSideMenu() {
    // Esconde todos os itens
    this.hideItems(this.el);

    // Mostra itens do Side Menu ativo
    this.showItems(this.parentElement);

    // Fecha Side Menu caso esteja aberto
    if (this.isParentOpen) {
      this.closeSideMenu();
      this.el.focus();
      return;
    }

    // Abre Side Menu
    this.openParent();
    this.el.focus();
  }

  @Listen('click')
  handleClick() {
    if (this.isParentDropMenu) {
      this.handleToggleDropMenu();
    }

    if (this.isParentSideMenu) {
      this.handleToggleSideMenu();
    }
  }

  connectedCallback(): void {
    if (this.initialSetup) {
      this.setupParent();
    }

    this.syncContainerIcon();
  }

  componentDidLoad(): void {
    this.syncContainerIcon();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
