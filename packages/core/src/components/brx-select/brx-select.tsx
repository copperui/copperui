import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Listen, Prop, State, Watch } from '@stencil/core';
import { TOKEN_UNCONTROLLED } from '../../tokens';
import { findTarget, findTargets, generateUniqueId, minmax, toggleItem } from '../../utils/helpers';
import { SelectOptionChangeEventDetail } from '../brx-select-option/brx-select-option-interface';
import { SelectChangeEventDetail } from './brx-select-interface';
import { DEFAULT_NOT_FOUND_IMAGE, mountSelectInputContent } from './brx-select-utils';

const DOMStrings = {
  toggle: 'brx-select-toggle',
  brxInput: '[data-select-input]',
  brxInputNative: '[data-select-input] input',
  option: 'brx-select-option',
  optionsList: '.brx-select-options',
  optionToggleAll: '[data-select-toggle-all]',
};

@Component({
  tag: 'brx-select',
  styleUrl: 'brx-select.scss',
  shadow: false,
})
export class BrxSelect implements ComponentInterface {
  @Element()
  el: HTMLElement;

  @Event()
  brxChange: EventEmitter<SelectChangeEventDetail>;

  get inputEl() {
    return this.el.querySelector<HTMLInputElement>(DOMStrings.brxInputNative);
  }

  get toggleEl() {
    return this.el.querySelector<HTMLBrxSelectToggleElement>(DOMStrings.toggle);
  }

  get optionsListEl() {
    return this.el.querySelector<HTMLBrxListElement>(DOMStrings.optionsList);
  }

  @Prop()
  label: string | undefined;

  @Prop({ mutable: true })
  inputId: string | undefined = undefined;

  @Prop({ reflect: true })
  multiple: boolean = false;

  @State()
  expanded = false;

  @State()
  notFound: boolean = false;

  @Prop()
  value: string[] = [];

  @Prop()
  controlledValue: string[] | TOKEN_UNCONTROLLED = TOKEN_UNCONTROLLED;

  @State()
  currentValue: string[] = [];

  @Listen('value')
  @Listen('controlledValue')
  syncCurrentValue() {
    const incomingValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
    this.currentValue = incomingValue ?? [];
  }

  get definedOptions() {
    return this.allOptions.filter(option => !option.matches(DOMStrings.optionToggleAll));
  }

  get allOptions() {
    return findTargets<HTMLBrxSelectOptionElement>(DOMStrings.option, this.el);
  }

  get focusedOption() {
    return this.definedOptions[this.focusedOptionIndex] ?? null;
  }

  get focusedOptionIndex() {
    return this.definedOptions.findIndex(selectOption => selectOption.querySelector('.focus-visible, :focus-visible'));
  }

  get currentValueLabels(): string[] {
    const currentValue = this.currentValue;

    return this.definedOptions
      .filter(option => currentValue.includes(option.value))
      .map(option => {
        const label = findTarget<HTMLLabelElement>('label', option);
        return label?.innerText;
      });
  }

  get currentValueOptions() {
    return this.currentValue.map(value => this.definedOptions.find(option => option.value === value));
  }

  get inputPlaceholder() {
    return this.multiple ? 'Selecione os itens.' : 'Selecione o item.';
  }

  get showToggleAll() {
    return this.multiple;
  }

  get isAllSelected() {
    return this.definedOptions.length === this.currentValue.length;
  }

  get toggleAllLabel() {
    return this.isAllSelected ? 'Deselecionar Todos' : 'Selecionar Todos';
  }

  set inputValue(value: string | null) {
    if (this.inputEl) {
      this.inputEl.value = value;
    }
  }

  setValue(value: string[]) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = value;
    }

    this.brxChange.emit({ value });
  }

  changeValue(optionValue: string) {
    const currentValue = this.multiple ? this.currentValue : this.currentValue.filter(i => i === optionValue);
    this.setValue(toggleItem(currentValue, optionValue));
  }

  selectAll() {
    this.setValue(this.definedOptions.map(option => option.value));
  }

  unselectAll() {
    this.setValue([]);
  }

  toggleAll() {
    if (this.isAllSelected) {
      this.unselectAll();
    } else {
      this.selectAll();
    }
  }

  openSelect() {
    this.expanded = true;
  }

  closeSelect() {
    this.expanded = false;
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  setInput() {
    const currentValueLabels = this.currentValueLabels;
    const preview = this.multiple ? mountSelectInputContent(this.inputEl, currentValueLabels) : currentValueLabels[0];
    this.inputValue = preview ?? null;
  }

  resetInput() {
    this.inputValue = null;
  }

  /**
   * Reseta o focus dos elementos
   */
  resetFocus() {
    // const focusedItems = Array.from(this.el.querySelectorAll<HTMLElement>(':focus-visible, .focus-visible'));
    // for (const option of focusedItems) {
    //   option.blur();
    //   option.classList.remove('.focus-visible');
    // }
  }

  resetVisible() {
    for (const option of this.allOptions) {
      option.visible = true;
    }
  }

  syncOptions() {
    for (const option of this.definedOptions) {
      option.multiple = this.multiple;
      option.checked = this.currentValue.includes(option.value);
    }
  }

  @Watch('currentValue')
  handleCurrentValueChange() {
    this.syncOptions();

    if (!this.multiple && this.expanded) {
      this.closeSelect();
    }

    this.setInput();
  }

  @Watch('expanded')
  handleExpandedChange() {
    this.toggleEl.expanded = this.expanded;

    if (this.expanded) {
      this.optionsListEl.dataset.selectExpanded = '';
    } else {
      delete this.optionsListEl.dataset.selectExpanded;
    }

    if (this.expanded) {
      this.resetInput();
    } else {
      this.setInput();
      this.resetFocus();
    }
  }

  @Listen('click', { target: 'window' })
  handleGlobalClick(event: Event) {
    const target = event.target as HTMLElement;

    if (!this.el.contains(target)) {
      this.closeSelect();
    }
  }

  @Listen('click')
  handleToggleClick(event: Event) {
    const target = event.target as HTMLElement;

    const trigger = target.closest(DOMStrings.toggle);

    if (trigger) {
      this.toggleExpanded();
    }
  }

  @Listen('brxFocus')
  handleInputFocus(event: Event) {
    const target = event.target as HTMLElement;

    const trigger = target.closest(DOMStrings.brxInput);

    if (trigger) {
      this.openSelect();
      this.resetFocus();
    }
  }

  @Listen('brxSelectOptionChange')
  handleCheckboxChange(event: CustomEvent<SelectOptionChangeEventDetail>) {
    const target = event.target as HTMLElement;

    const { value, checked } = event.detail;

    if (target.closest(DOMStrings.optionToggleAll)) {
      if (checked) {
        this.selectAll();
      } else {
        this.unselectAll();
      }
    } else {
      this.changeValue(value);
    }
  }

  getNextItem() {
    const options = this.definedOptions;
    const targetIndex = minmax(this.focusedOptionIndex + 1, 0, options.length - 1);
    return this.definedOptions[targetIndex];
  }

  getPreviousItem() {
    const options = this.definedOptions;
    const targetIndex = minmax(this.focusedOptionIndex - 1, 0, options.length - 1);
    return this.definedOptions[targetIndex];
  }


  /**
   * Define comportamentos de teclado no option
   */
  setKeyClickOnOption() {
    const option = this.focusedOption;
    this.changeValue(option.value);
  }

  componentWillLoad() {
    if (!this.inputId) {
      this.inputId = generateUniqueId();
    }

    this.syncCurrentValue();
  }

  componentDidLoad() {
    this.setInput();
  }

  render() {
    const { inputPlaceholder, isAllSelected, toggleAllLabel, showToggleAll, notFound, label } = this;

    return (
      <Host>
        <brx-input type="text" label={label} data-select-input placeholder={inputPlaceholder} start-icon-name="fa5/fas/search">
          <brx-select-toggle slot="end-button"></brx-select-toggle>
        </brx-input>

        <div tabindex="0" class="brx-select-options">
          {showToggleAll && <brx-select-option data-select-toggle-all multiple checked={isAllSelected} label={toggleAllLabel}></brx-select-option>}

          <slot></slot>

          {notFound && (
            <slot name="not-found">
              <div class="br-item not-found">
                <div class="container pl-0 pr-0">
                  <div class="row">
                    <div class="col-auto">
                      <img src={DEFAULT_NOT_FOUND_IMAGE} />
                    </div>
                    <div class="col">
                      <p>
                        <strong>Ops!</strong> Não encontramos o que você está procurando!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </slot>
          )}
        </div>
      </Host>
    );
  }
}
