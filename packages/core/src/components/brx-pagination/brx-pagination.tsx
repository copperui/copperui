import { Component, Host, h, Prop, State, Watch, Listen, Event, EventEmitter, Element, ComponentInterface } from '@stencil/core';
import { TOKEN_UNCONTROLLED } from '../../tokens';
import { findTargets } from '../../utils/helpers';
import { IPaginationItemTarget, ISpecialToken, isSpecialToken, parseTarget } from '../brx-pagination-item/brx-pagination-item-interface';

const DOMStrings = {
  paginationTargetTrigger: '[data-pagination-target]',
};

@Component({
  tag: 'brx-pagination',
  styleUrl: 'brx-pagination.scss',
  shadow: false,
})
export class BrxPagination implements ComponentInterface {
  @Element()
  el: HTMLElement;

  @Event()
  brxUpdate: EventEmitter<{ page: number }>;

  @Event()
  brxChange: EventEmitter<{ target: IPaginationItemTarget }>;

  @Prop()
  page: number | undefined;

  @Prop()
  controlledPage: number | TOKEN_UNCONTROLLED = TOKEN_UNCONTROLLED;

  @State()
  currentPage: number | undefined;

  @Prop()
  total: number | undefined;

  get paginationItems() {
    return findTargets<HTMLBrxPaginationItemElement>('brx-pagination-item', this.el);
  }

  get activePaginationItemIndex() {
    return this.paginationItems.findIndex(paginationItem => paginationItem.contains(document.activeElement));
  }

  get activePaginationItem() {
    return this.paginationItems[this.activePaginationItemIndex];
  }

  get hasTotal() {
    return typeof this.total === 'number';
  }

  @Watch('currentPage')
  async syncItems() {
    const { currentPage, paginationItems, total } = this;

    for (const paginationItem of paginationItems) {
      const target = await paginationItem.getTarget();

      if (typeof target === 'number') {
        paginationItem.active = target === this.currentPage;

        if (paginationItem.active) {
          if (this.el.contains(document.activeElement) && this.activePaginationItemIndex === -1) {
            paginationItem.focus();
          }
        }
      } else {
        switch (target) {
          case 'first':
          case 'prev': {
            paginationItem.disabled = currentPage === 1;
            break;
          }

          case 'next':
          case 'last': {
            paginationItem.disabled = this.hasTotal && currentPage === total;
            break;
          }

          default: {
            break;
          }
        }

        if (paginationItem.disabled) {
          const focusedElements = findTargets(':focus-visible, .focus-visible', paginationItem, ['child', 'parent', 'self']);

          for (const focusedElement of focusedElements) {
            focusedElement.blur();
            focusedElement.classList.remove('focus-visible');
          }
        }
      }
    }
  }

  @Watch('page')
  @Watch('controlledPage')
  handlePageChange() {
    const page = this.controlledPage !== TOKEN_UNCONTROLLED ? this.controlledPage : this.page;
    this.currentPage = page;
  }

  getTargetIndex(target: IPaginationItemTarget): number | -1 {
    if (isSpecialToken(target)) {
      switch (target) {
        case 'first': {
          return 1;
        }

        case 'prev': {
          return Math.max(this.currentPage - 1, 1);
        }

        case 'next': {
          return this.currentPage + 1;
        }

        case 'last': {
          return this.hasTotal ? this.total : -1;
        }
      }
    }

    return target;
  }

  setPage(target: IPaginationItemTarget) {
    if (this.controlledPage === TOKEN_UNCONTROLLED) {
      const index = this.getTargetIndex(target);

      if (index !== -1) {
        this.currentPage = index;
      }
    }

    this.brxChange.emit({ target });
  }

  @Watch('currentPage')
  handleCurrentPageChange() {
    this.brxUpdate.emit({ page: this.currentPage });
  }

  @Listen('click')
  handlePaginationTargetClick(event: Event) {
    const target = event.target as HTMLElement;

    if (target.closest(':disabled, [disabled]')) {
      return;
    }

    const trigger = target.closest<HTMLElement>(DOMStrings.paginationTargetTrigger);

    if (trigger) {
      const target = parseTarget(trigger.dataset.paginationTarget);
      this.setPage(target);
    }
  }

  connectedCallback() {
    this.handleCurrentPageChange();
  }

  // @Prop()
  // hideJumpFirst: boolean = false;

  // @Prop()
  // hideJumpPrev: boolean = false;

  // @Prop()
  // hideJumpNext: boolean = false;

  // @Prop()
  // hideJumpLast: boolean = false;

  // @Prop()
  // canJumpFirst: boolean | null = null;

  // @Prop()
  // canJumpPrev: boolean | null = null;

  // @Prop()
  // canJumpNext: boolean | null = null;

  // @Prop()
  // canJumpLast: boolean | null = null;

  // @Prop()
  // siblingCount: number | null = null;

  // @Prop()
  // boundaryCount: number | null = null;

  // @Prop()
  // count: number | null = null;
  render() {
    return (
      <Host>
        <nav aria-label="Paginação de resultados.">
          <ul class={'brx-pagination-items-list'}>
            <slot></slot>
          </ul>
        </nav>
      </Host>
    );
  }
}
