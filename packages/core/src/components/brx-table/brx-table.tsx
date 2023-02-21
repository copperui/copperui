import { Component, Element, h, Host, Listen, Prop, State, Watch } from '@stencil/core';
import { enqueueIdleCallback, findTarget, findTargets } from '../../utils/helpers';

const DOMStrings = {
  header: 'brx-table-header',
  table: 'table',

  searchTrigger: '[data-toggle="search"]',
  searchTarget: 'brx-table-search-bar',
  searchDismiss: '[data-dismiss="search"]',

  selectedBar: 'brx-table-selected-bar',

  checkAll: '[data-toggle="check-all"]',

  tableCheckbox: 'tbody brx-checkbox',
};

@Component({
  tag: 'brx-table',
  styleUrl: 'brx-table.scss',
  shadow: false,
})
export class BrxTable {
  @Element()
  el!: HTMLBrxTableElement;

  private get _searchTarget() {
    return findTarget(DOMStrings.searchTarget, this.el);
  }

  private get _searchTriggers() {
    return findTargets(DOMStrings.searchTrigger, this.el);
  }

  private get selectedBar() {
    return findTarget(DOMStrings.selectedBar, this.el);
  }

  private get tableCheckboxes() {
    return findTargets(DOMStrings.tableCheckbox, this.el);
  }

  private get headerCheckbox() {
    return findTarget<HTMLBrxCheckboxElement | HTMLInputElement>('.headers brx-checkbox', this.el);
  }

  @Prop({ reflect: true })
  density: 'small' | 'medium' | 'large' | undefined;

  @State()
  isSearchBarOpen = false;

  @Watch('isSearchBarOpen')
  handleSearchBarOpenChange() {
    const searchTarget = this._searchTarget;

    const mainTrigger = this._searchTriggers[0];

    for (const searchTrigger of this._searchTriggers) {
      searchTrigger.setAttribute('aria-expanded', this.isSearchBarOpen ? 'true' : 'false');
    }

    if (this.isSearchBarOpen) {
      searchTarget.classList.add('show');
      searchTarget.parentElement.classList.add('show');
      searchTarget.querySelector('input').focus();
    } else {
      searchTarget.querySelector('input').value = '';
      searchTarget.classList.remove('show');
      searchTarget.parentElement.classList.remove('show');

      if (mainTrigger) {
        mainTrigger.focus();
      }
    }
  }

  // _getBRHeaderHeight() {
  //   // const brxHeader = findTarget('brx-header');
  //   // if (brxHeader) {
  //   //   window.addEventListener('scroll', () => {
  //   //     this._header.style.top = `${brxHeader.clientHeight}px`;
  //   //   });
  //   // }
  // }

  // _makeResponsiveTable() {
  //   const responsiveClass = 'responsive';

  //   if (!this.el.querySelector(`.${responsiveClass}`)) {
  //     const responsiveElement = document.createElement('div');
  //     responsiveElement.classList.add(responsiveClass);
  //     responsiveElement.appendChild(this._table);
  //     this._header.after(responsiveElement);
  //   }
  // }

  // _setHeaderWidth() {
  //   for (const clonedHeader of findTargets('.headers > div', this.el)) {
  //     for (const [index, header] of findTargets('table thead tr th', this.el).entries()) {
  //       const target = clonedHeader.children[index] as HTMLElement | null;

  //       if (target) {
  //         target.style.flex = `1 0 ${header.offsetWidth}px`;
  //       }
  //     }
  //   }
  // }

  setRowState(checkbox: HTMLElement, isChecked: boolean) {
    const tr = checkbox.closest('tr');

    const brxInput = checkbox.closest<HTMLBrxCheckboxElement>('brx-checkbox');

    if (isChecked) {
      tr.classList.add('is-selected');

      if (brxInput) {
        brxInput.darkMode = true;
      }
    } else {
      tr.classList.remove('is-selected');

      if (brxInput) {
        brxInput.darkMode = false;
      }
    }
  }

  checkRow(checkbox: HTMLBrxCheckboxElement) {
    enqueueIdleCallback(async () => {
      const check = await checkbox.getNativeChecked();

      this.setRowState(checkbox, check);
      this.setSelectedBar(check ? 1 : -1);
    });
  }

  checkRows(checkboxes: HTMLElement[]) {
    for (const checkbox of checkboxes) {
      this.setRowState(checkbox, true);
    }
  }

  uncheckRows(checkboxes: HTMLElement[]) {
    for (const checkbox of checkboxes) {
      this.setRowState(checkbox, false);
    }
  }

  checkAllRows() {
    this.checkRows(this.tableCheckboxes);
  }

  uncheckAllRows() {
    this.uncheckRows(this.tableCheckboxes);
  }

  checkAllTable() {
    const total = this.tableCheckboxes.length;

    let count = total;

    const infoCount = this.selectedBar.querySelector('.info .count');
    const infoCountTotal = parseInt(infoCount.innerHTML, 10);

    if (infoCountTotal === total) {
      this.uncheckAllRows();
      count = -1 * count;
    } else {
      this.checkAllRows();
    }

    this.setSelectedBar(count);
  }

  setSelectedBar(count: number) {
    const infoCount = this.selectedBar.querySelector('.info .count');
    const infoText = this.selectedBar.querySelector('.info .text');

    const total = count < 2 ? parseInt(infoCount.innerHTML, 10) + count : count;

    const selectedBar = this.selectedBar;
    const tableCheckboxes = this.tableCheckboxes;
    const headerCheckbox = this.headerCheckbox;

    if (total > 0) {
      selectedBar.classList.add('show');

      infoCount.innerHTML = String(total);
      infoText.innerHTML = total > 1 ? 'itens selecionados.' : 'item selecionado.';

      if (headerCheckbox) {
        headerCheckbox.parentElement.classList.add('is-checking');
      }

      if (total === tableCheckboxes.length) {
        if (headerCheckbox) {
          headerCheckbox.checked = true;
          headerCheckbox.parentElement.classList.remove('is-checking');
        }
      }
    } else {
      infoCount.innerHTML = '0';

      if (headerCheckbox) {
        headerCheckbox.checked = false;
        headerCheckbox.parentElement.classList.remove('is-checking');
      }

      selectedBar.classList.remove('show');
    }
  }

  @Listen('click')
  handleSearchTriggerClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.closest(DOMStrings.searchTrigger)) {
      this.isSearchBarOpen = !this.isSearchBarOpen;
    }
  }

  @Listen('click')
  handleSearchDismissClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.closest(DOMStrings.searchDismiss)) {
      this.isSearchBarOpen = false;
    }
  }

  @Listen('keydown')
  handleSearchTargetKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;

    if (target.matches(`${DOMStrings.searchTarget} input`)) {
      if (event.key === 'Escape') {
        this.isSearchBarOpen = false;
      }
    }
  }

  @Listen('click')
  handleCheckAllClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.matches(DOMStrings.checkAll)) {
      this.checkAllTable();
    }
  }

  @Listen('brxUpdate')
  handleCheckboxUpdate(event: CustomEvent<unknown>) {
    const target = event.target as HTMLElement;

    const brxCheckbox = target.closest<HTMLBrxCheckboxElement>(DOMStrings.tableCheckbox);

    if (brxCheckbox) {
      this.checkRow(brxCheckbox);
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
