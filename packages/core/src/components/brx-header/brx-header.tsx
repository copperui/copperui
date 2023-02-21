import { Component, Element, h, Host, Listen, Prop } from '@stencil/core';
import { findTarget } from '../../utils/helpers';

const DOMStrings = {
  search: 'brx-header-search',
  searchInput: 'brx-header-search input',
  searchTrigger: '[data-toggle="search"]',
  searchDismiss: '[data-dismiss="search"]',
  menuTrigger: '[data-target="#main-navigation"]',
};

@Component({
  tag: 'brx-header',
  styleUrl: 'brx-header.scss',
  shadow: false,
})
export class BrxHeader {
  @Element()
  component: HTMLElement;

  private get componentSearch() {
    return findTarget(DOMStrings.search, this.component);
  }

  @Prop({ reflect: true })
  compact: boolean;

  @Listen('click')
  handleClick(event: Event) {
    const target = event.target as HTMLElement;

    if (target.closest(DOMStrings.searchTrigger)) {
      this.openSearch();
    }

    if (target.closest(DOMStrings.searchDismiss)) {
      this.closeSearch();
    }
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;

    if (target.closest(DOMStrings.searchInput)) {
      switch (event.code) {
        case 'Escape': {
          this.closeSearch();
          break;
        }

        default: {
          break;
        }
      }
    }
  }

  openSearch() {
    if (this.componentSearch) {
      this.componentSearch.classList.add('active');
      this.componentSearch.querySelector('input').focus();
    }
  }

  closeSearch() {
    if (this.componentSearch) {
      this.componentSearch.classList.remove('active');
      //this.componentSearchTrigger.focus()
      this.nextFocusElement().focus();
    }
  }

  @Listen('scroll', { target: 'window', passive: true })
  handleScroll() {
    if (this.component.hasAttribute('data-sticky')) {
      if (window.pageYOffset > this.component.offsetHeight) {
        this.component.classList.add('sticky', 'compact');
      } else {
        this.component.classList.remove('sticky', 'compact');
      }
    }
  }

  private nextFocusElement() {
    //lista de elementos de ação
    const focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    if (document.activeElement) {
      const focussable = Array.prototype.filter.call(document.body.querySelectorAll(focussableElements), element => {
        //check for visibility while always include the current activeElement
        return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement;
      });
      const index = focussable.indexOf(document.activeElement);
      if (index > -1) {
        const nextElement = focussable[index + 1] || focussable[0];
        //nextElement.focus();
        return nextElement;
      }
    }
    return null;
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
