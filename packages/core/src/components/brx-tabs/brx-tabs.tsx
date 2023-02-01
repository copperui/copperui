import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { getWindow } from '../../utils/helpers';
import { TabChangeEventDetail, TabClickEventDetail } from './brx-tabs-interface';

@Component({
  tag: 'brx-tabs',
  styleUrl: 'brx-tabs.scss',
  shadow: false,
})
export class BrxTabs implements ComponentInterface {
  @Element()
  el: HTMLElement;

  @Event()
  brxTabClick: EventEmitter<TabClickEventDetail>;

  @Event()
  brxTabChange: EventEmitter<TabChangeEventDetail>;

  @Prop({ reflect: true })
  name: string;

  @Prop({ reflect: true })
  counter: boolean = false;

  @Prop({ reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @Prop({ reflect: true })
  darkMode: boolean = false;

  @Prop({ reflect: true })
  value: string | undefined | null = null;

  @Prop({})
  defaultValue: string | undefined = undefined;

  @State()
  currentValue: string | undefined = undefined;

  @Method()
  async getCurrentValue() {
    return this.currentValue;
  }

  private navigationLeft: number;
  private navigationRight: number;
  private lastItemPosition: number;

  get navEl() {
    return this.el.querySelector<HTMLDivElement>('.brx-tabs-nav');
  }

  get height() {
    return this.navEl.clientHeight;
  }

  get scrollsizes() {
    return this.navEl.scrollHeight - this.navEl.clientHeight;
  }

  get tabItems() {
    return Array.from(this.el.querySelectorAll('brx-tab'));
  }

  get activeTabItem(): HTMLBrxTabElement | null {
    const { activeTabItemIndex } = this;

    return this.tabItems[activeTabItemIndex] ?? null;
  }

  get activeTabItemIndex() {
    return this.tabItems.findIndex(tab => tab.hasAttribute('active'));
  }

  get currentFocusedIndex() {
    return Math.max(
      Array.from(this.el.querySelectorAll('brx-tab')).findIndex(i => i.querySelector('.focus-visible') !== null),
      0,
    );
  }

  get scrollHeight() {
    const doc = getWindow().document;

    return Math.max(
      this.el.scrollWidth,
      doc.documentElement.scrollWidth,
      this.el.offsetWidth,
      doc.documentElement.offsetWidth,
      this.el.clientWidth,
      doc.documentElement.clientWidth,
    );
  }

  get leftPosition() {
    return this.el.offsetWidth - 1;
  }

  setBehavior() {
    const anchor = this.navEl;

    anchor.style.setProperty('--height-nav', `${this.height}px`);
    anchor.style.setProperty('--right-gradient-nav', `${this.leftPosition}px`);

    this.positionScroll(anchor);

    this.navigationRight += 4;

    if (this.navigationRight <= this.lastItemPosition - 5) {
      anchor.classList.add('brx-tabs-nav-right');
    }

    anchor.addEventListener('scroll', () => {
      this.positionScroll(anchor);

      if (this.navigationLeft <= 0) {
        anchor.classList.add('brx-tabs-nav-left');
      } else {
        anchor.classList.remove('brx-tabs-nav-left');
      }

      if (this.navigationRight <= this.lastItemPosition - 5) {
        anchor.classList.add('brx-tabs-nav-right');
      } else {
        anchor.classList.remove('brx-tabs-nav-right');
      }
    });
  }

  positionScroll(anchor: HTMLElement) {
    const tabItems = this.tabItems;

    this.lastItemPosition = Math.ceil(tabItems[tabItems.length - 1].getBoundingClientRect().right);
    this.navigationLeft = Math.floor(tabItems[0].getBoundingClientRect().left);
    this.navigationRight = Math.floor(anchor.getBoundingClientRect().right);
  }

  syncTabs() {
    this.openTab(this.currentValue);
  }

  openTab(value: string | undefined) {
    const tabs = this.tabItems;

    for (const tab of tabs) {
      tab.setActive(tab.value === value);
    }
  }

  updateValue(value: string | undefined) {
    if (this.value === null) {
      this.currentValue = value;
    }
  }

  getInitialValue() {
    return this.value ?? this.defaultValue ?? this.activeTabItem?.value;
  }

  clean() {
    for (const tab of this.tabItems) {
      const button = tab.querySelector('button');
      button.classList.remove('focus-visible');
      tab.setActive(false);
    }
  }

  hiddenTooltips() {
    const tooltips = Array.from(this.el.querySelectorAll('brx-tooltip'));

    for (const tooltip of tooltips) {
      tooltip.hide();
    }
  }

  @Watch('currentValue')
  handleCurrentValueChange() {
    this.syncTabs();
    this.brxTabChange.emit({ value: this.currentValue });
  }

  @Watch('value')
  handleValueChange() {
    this.currentValue = this.value;
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    const jumpToIndex = (targetIndex: number) => {
      event.preventDefault();

      const tab = this.tabItems[targetIndex];

      if (tab) {
        this.openTab(tab.value);
        const button = tab.querySelector('button');
        button.focus();
      }

      event.stopPropagation();
    };

    const rotateFocus = (direction: number) => {
      event.preventDefault();

      const { currentFocusedIndex } = this;

      const targetIndex = currentFocusedIndex + direction;

      const tab = this.tabItems[targetIndex];

      if (tab) {
        const button = tab.querySelector('button');
        button.focus();
      }

      event.stopPropagation();
    };

    switch (event.key) {
      case 'End': {
        jumpToIndex(this.tabItems.length - 1);
        break;
      }
      case 'Home': {
        jumpToIndex(0);
        break;
      }
      case 'ArrowLeft': {
        rotateFocus(-1);
        break;
      }
      case 'ArrowRight': {
        rotateFocus(1);
        break;
      }
      case 'Tab': {
        rotateFocus(0);
        break;
      }

      case ' ': {
        event.preventDefault();

        this.hiddenTooltips();
        const target = event.target as HTMLElement;
        target.click();

        event.stopPropagation();
        break;
      }

      default: {
        break;
      }
    }
  }

  @Listen('click')
  handleTabClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const tabTrigger = target.closest('brx-tab button');

    if (tabTrigger) {
      const tab = tabTrigger.closest('brx-tab');

      const { value } = tab;

      this.updateValue(value);

      this.brxTabClick.emit({ value });
    }
  }

  @Listen('focusout')
  handleFocusOut() {
    this.hiddenTooltips();
  }

  @Listen('keyup')
  handleKeyUp(event: KeyboardEvent) {
    this.handleKeyboardEvent(event);
  }

  componentWillLoad() {
    this.currentValue = this.getInitialValue();
    this.syncTabs();
  }

  componentShouldUpdate(newVal: any, oldVal: any, propName: string): boolean | void {
    return propName !== 'currentValue';
  }

  render() {
    return (
      <Host>
        <nav class="brx-tabs-nav">
          <ul>
            <slot></slot>
          </ul>
        </nav>
      </Host>
    );
  }
}
