import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Listen, Prop, State, Watch } from '@stencil/core';
import { TOKEN_UNCONTROLLED } from '../../tokens';
import { enqueueIdleCallback, findTarget, findTargets, generateUniqueId, minmax, toggleItem } from '../../utils/helpers';
import { InputChangeEventDetail } from '../brx-input/brx-input.interface';
import { SelectOptionChangeEventDetail } from '../brx-select-option/brx-select-option-interface';
import { SelectChangeEventDetail, SelectFilterInputChangeEventDetail } from './brx-select-interface';
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

  @Event()
  brxFilterInputChange: EventEmitter<SelectFilterInputChangeEventDetail>;

  get inputEl() {
    return this.el.querySelector<HTMLInputElement>(DOMStrings.brxInputNative);
  }

  get toggleEl() {
    return this.el.querySelector<HTMLBrxSelectToggleElement>(DOMStrings.toggle);
  }

  get optionsListEl() {
    return this.el.querySelector<HTMLBrxListElement>(DOMStrings.optionsList);
  }

  @Prop({ reflect: true })
  darkMode = false;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop({ reflect: true })
  name: string | undefined;

  @Prop()
  nativeSelect: boolean | null = null;

  @Prop()
  label: string | undefined;

  @Prop({ mutable: true })
  inputId: string | undefined = undefined;

  @Prop({ reflect: true })
  multiple: boolean = false;

  @State()
  expanded = false;

  @State()
  showFeedbackNotFound: boolean = false;

  @Prop()
  disableToggleAll = false;

  @Prop()
  selectAllLabel = 'Selecionar Todos';

  @Prop()
  unselectAllLabel = 'Deselecionar Todos';

  @Prop()
  value: string[] = [];

  @Prop()
  controlledValue: string[] | TOKEN_UNCONTROLLED = TOKEN_UNCONTROLLED;

  @State()
  currentValue: string[] = [];

  @Watch('value')
  @Watch('controlledValue')
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
    return this.allOptions[this.focusedOptionIndex] ?? null;
  }

  get focusedOptionIndex() {
    return this.allOptions.findIndex(option => option.contains(document.activeElement));
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

  get isToggleAllEnabled() {
    return this.multiple && !this.disableToggleAll;
  }

  get isAllSelected() {
    return this.definedOptions.length === this.currentValue.length;
  }

  get toggleAllLabel() {
    return this.isAllSelected ? this.unselectAllLabel : this.selectAllLabel;
  }

  set inputValue(value: string | null) {
    if (this.inputEl) {
      this.inputEl.value = value;

      if (value === null || value === '') {
        this.brxFilterInputChange.emit({ query: '' });
      }
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

  focusOption(option: HTMLBrxSelectOptionElement | null = null) {
    const item = option && findTarget<HTMLBrxItemElement>('brx-item', option);

    if (item) {
      item.focus();
    }
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
    }
  }

  async handleOptionChange(option: HTMLBrxSelectOptionElement, incomingDetail?: SelectOptionChangeEventDetail) {
    const isToggleAll = option.closest(DOMStrings.optionToggleAll);

    const { value, checked } = incomingDetail;

    if (isToggleAll) {
      if (checked) {
        this.selectAll();
      } else {
        this.unselectAll();
      }
    } else {
      this.changeValue(value);
    }
  }

  @Listen('brxSelectOptionChange')
  handleOptionChangeEvent(event: CustomEvent<SelectOptionChangeEventDetail>) {
    const target = event.target as HTMLElement;

    const option = target.closest<HTMLBrxSelectOptionElement>(DOMStrings.option);

    this.handleOptionChange(option, event.detail);
  }

  @Listen('brxChange')
  handleInputChange(event: CustomEvent<unknown>) {
    const target = event.target as HTMLElement;

    const brxInput = target.closest<HTMLBrxInputElement>('brx-input');

    if (brxInput) {
      const detail = event.detail as InputChangeEventDetail;
      this.brxFilterInputChange.emit({ query: String(detail.value) });
    }
  }

  getRotatedFocusedOptionIndex(direction: number) {
    return minmax(this.focusedOptionIndex + direction, 0, this.allOptions.length - 1);
  }

  getRotatedFocusedOption(direction: number) {
    const targetIndex = this.getRotatedFocusedOptionIndex(direction);
    return this.allOptions[targetIndex];
  }

  rotateOptionFocus(direction: number) {
    this.focusOption(this.getRotatedFocusedOption(direction));
  }

  handleKeydownOnInput(event: KeyboardEvent) {
    switch (event.key) {
      case 'Tab': {
        if (event.shiftKey) {
          this.closeSelect();
        } else {
          this.toggleEl.focus();
        }

        break;
      }

      default: {
        break;
      }
    }

    if (event.code === 'ArrowDown') {
      event.preventDefault();
      this.rotateOptionFocus(1);
    }
  }

  /**
   * Define comportamentos de teclado no option
   */
  async setKeyboardClickOnActiveOption() {
    const option = this.focusedOption;
    option.toggleChecked();
  }

  handleKeydownOnList(event: KeyboardEvent) {
    const handledCodes = ['Tab', 'Escape', 'Space', 'ArrowUp', 'ArrowDown'];

    if (handledCodes.includes(event.code)) {
      event.preventDefault();
    }

    switch (event.code) {
      case 'Tab': {
        this.closeSelect();
        break;
      }
      case 'Escape': {
        this.closeSelect();
        break;
      }
      case 'Space': {
        this.setKeyboardClickOnActiveOption();
        break;
      }
      case 'ArrowUp': {
        this.rotateOptionFocus(-1);
        break;
      }
      case 'ArrowDown': {
        this.rotateOptionFocus(1);
        break;
      }
      default: {
        break;
      }
    }
  }

  @Listen('keydown')
  handleKeydownEvent(event: KeyboardEvent) {
    const target = event.target as HTMLElement;

    if (target.closest('brx-input')) {
      this.handleKeydownOnInput(event);
    }

    if (target.closest('.brx-select-options')) {
      this.handleKeydownOnList(event);
    }
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

  get isNativeSelectEnabled() {
    return this.nativeSelect ?? typeof this.name === 'string';
  }

  render() {
    return (
      <Host>
        <brx-input type="text" label={this.label} data-select-input placeholder={this.inputPlaceholder} start-icon-name="fa5/fas/search">
          <brx-select-toggle slot="end-button"></brx-select-toggle>
        </brx-input>

        <div tabindex="0" class="brx-select-options">
          {this.isToggleAllEnabled && <brx-select-option data-select-toggle-all highlighted multiple checked={this.isAllSelected} label={this.toggleAllLabel}></brx-select-option>}

          <slot></slot>

          {this.showFeedbackNotFound && (
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

          <div class={'d-none'}>
            {this.isNativeSelectEnabled && (
              <select name={this.name}>
                {this.definedOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label ?? option.value}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
