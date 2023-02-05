import { Component, ComponentInterface, Element, h, Host, Listen, Prop, State, Watch } from '@stencil/core';
import { Instance } from 'flatpickr/dist/types/instance';
import { BaseOptions, Hook, Options } from 'flatpickr/dist/types/options';
import { TOKEN_UNCONTROLLED } from '../../tokens';
import { enqueueIdleCallback, findTarget, tryParseJSON } from '../../utils/helpers';
import { BrxInput } from '../brx-input/brx-input';
import { getConfigSetupForType, getDefaultLocale, getFlatpickr, Type } from './brx-datetimepicker-helpers';

@Component({
  tag: 'brx-datetimepicker',
  styleUrl: 'brx-datetimepicker.scss',
  shadow: false,
})
export class BrxDatetimepicker implements ComponentInterface {
  private fp: Instance | null;

  @Element()
  el: HTMLElement;

  get inputEl() {
    return findTarget<HTMLInputElement>('input', this.el);
  }

  get selectionStart() {
    return this.inputEl.selectionStart;
  }

  get inputValue() {
    return this.inputEl.value;
  }

  @Prop()
  type: Type;

  @Prop()
  mode: 'single' | 'range' = 'single';

  @Prop()
  placeholder: string | undefined;

  @Prop()
  config: string | Options | undefined;

  @Prop()
  value: string | undefined;

  @Prop()
  controlledValue: string | undefined | TOKEN_UNCONTROLLED = TOKEN_UNCONTROLLED;

  @State()
  currentValue: string | undefined;

  @Watch('value')
  @Watch('controlledValue')
  syncCurrentValueFromProps() {
    this.currentValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
  }

  get parsedConfigProp(): Partial<BaseOptions> {
    const config = tryParseJSON(this.config ?? {});
    return typeof config !== 'string' ? config : {};
  }

  get configSetup() {
    return getConfigSetupForType(this.type);
  }

  get configNative() {
    const { mode } = this;

    const { dateFormat, noCalendar, enableTime } = this.configSetup;

    return {
      mode,
      dateFormat,
      enableTime,
      noCalendar,
      wrap: true,
      time_24hr: true,
      allowInput: true,
      minuteIncrement: 1,
      disableMobile: 'true',
      nextArrow: '<brx-button circle size="small" type="button"><brx-icon name="fa5/fas/chevron-right"></brx-icon></brx-button>',
      prevArrow: '<brx-button circle size="small" type="button"><brx-icon name="fa5/fas/chevron-left"></brx-icon></brx-button>',
    };
  }

  get configFlatpick() {
    return Object.assign({}, this.parsedConfigProp, this.configNative);
  }

  get iconName() {
    switch (this.type) {
      case Type.DATE:
      case Type.DATETIME_LOCAL: {
        return 'fa5/fas/calendar-alt';
      }

      case Type.TIME: {
        return 'fa5/fas/clock';
      }

      default: {
        return null;
      }
    }
  }

  get inputInitialType(): BrxInput['type'] {
    switch (this.type) {
      case Type.TIME: {
        return 'time';
      }

      case Type.DATETIME_LOCAL: {
        return 'datetime-local';
      }

      case Type.DATE:
      default: {
        return 'text';
      }
    }
  }

  get flatpickr() {
    return getFlatpickr();
  }

  get language() {
    return getDefaultLocale();
  }

  /**
   * Adiciona máscara de data no input
   */
  dateInputMask(input: HTMLInputElement) {
    input.setAttribute('maxlength', '10');

    input.addEventListener('keypress', e => {
      if (!e.code.startsWith('Digit')) {
        e.preventDefault();
      }

      const length = input.value.length;

      // TODO: ????
      // if (len !== 1 || len !== 3) {
      if (length !== 1 && length !== 3) {
        if (e.code == 'Help') {
          e.preventDefault();
        }
      }

      if (length === 2) {
        input.value += '/';
      }

      if (length === 5) {
        input.value += '/';
      }
    });
  }

  /**
   *  Adiciona máscara de hora no input
   */
  dateTimeInputMask(input: HTMLInputElement) {
    input.setAttribute('maxlength', '16');

    input.addEventListener('keypress', e => {
      if (!e.code.startsWith('Digit')) {
        e.preventDefault();
      }

      const length = input.value.length;

      // TODO: ????
      if (length !== 1 && length !== 3) {
        if (e.code == 'Help') {
          e.preventDefault();
        }
      }

      switch (length) {
        case 2: {
          input.value += '/';
          break;
        }
        case 5: {
          input.value += '/';
          break;
        }
        case 10: {
          input.value += ' ';
          break;
        }
        case 13: {
          input.value += ':';
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  /**
   * Coloca máscara com range de data no input
   */
  dateRangeInputMask(input: HTMLInputElement) {
    input.setAttribute('maxlength', '25');

    input.addEventListener('keypress', e => {
      if (!e.code.startsWith('Digit')) {
        e.preventDefault();
      }

      const length = input.value.length;

      // TODO: ????
      // if (len !== 1 || len !== 3) {
      if (length !== 1 && length !== 3) {
        if (e.code === 'Help') {
          e.preventDefault();
        }
      }

      this.positionRangeMask(input, length);
    });
  }

  /**
   * Insere a máscara na Dom
   */
  async positionRangeMask(input: HTMLInputElement, length: number) {
    const language = await this.language;

    const tamSeparator = language.rangeSeparator.length;
    const daySeparator = 10 + tamSeparator + 2;
    const monthSeparator = 10 + tamSeparator + 5;

    input.setAttribute('maxlength', `${20 + tamSeparator}`);

    switch (length) {
      case 2: {
        input.value += '/';
        break;
      }
      case 5: {
        input.value += '/';
        break;
      }
      case 10: {
        input.value += language.rangeSeparator;
        break;
      }
      case daySeparator: {
        input.value += '/';
        break;
      }
      case monthSeparator: {
        input.value += '/';
        break;
      }
      default: {
        break;
      }
    }
  }

  /**
   * Insere máscara de hora
   */
  timeInputMask(input: HTMLInputElement) {
    input.setAttribute('maxlength', '5');

    input.addEventListener('keypress', e => {
      if (!e.code.startsWith('Digit')) {
        e.preventDefault();
      }

      const length = input.value.length;

      // TODO: ????
      // if (len !== 1 || len !== 3) {
      if (length !== 1 && length !== 3) {
        if (e.code === 'Help') {
          e.preventDefault();
        }
      }

      if (length === 2) {
        input.value += ':';
      }
    });
  }

  async setupMask() {
    switch (this.type) {
      case Type.DATE: {
        this.dateInputMask(this.inputEl);
        break;
      }

      case Type.TIME: {
        this.timeInputMask(this.inputEl);
        break;
      }

      case Type.DATETIME_LOCAL: {
        this.dateTimeInputMask(this.inputEl);
        break;
      }

      default: {
        if (this.mode === 'range') {
          this.dateRangeInputMask(this.inputEl);
        } else {
          this.dateInputMask(this.inputEl);
        }
        break;
      }
    }
  }

  @Watch('type')
  @Watch('mode')
  @Watch('config')
  async buildDateTimePicker() {
    if (this.fp) {
      this.fp.destroy();
      this.fp = null;
    }

    const flatpickr = await this.flatpickr;
    const language = await this.language;
    flatpickr.localize(language);

    await this.setupMask();

    this.fp = flatpickr(this.el, this.configFlatpick);

    const handleOpen = () => {
      document.querySelectorAll('.arrowUp').forEach(element => {
        element.classList.add('fas', 'fa-chevron-up');
      });

      document.querySelectorAll('.arrowDown').forEach(element => {
        element.classList.add('fas', 'fa-chevron-down');
      });
    };

    this.fp.config.onOpen.push(handleOpen);

    const handleChange: Hook = () => {
      console.log('fp#config#onChange');
    };

    this.fp.config.onChange.push(handleChange);
  }

  @Listen('keyup')
  handleKeyup() {
    const { fp, inputValue } = this;

    if (fp) {
      if (!Number.isNaN(new Date(inputValue))) {
        // if the cursor is at the end of the edit and we have a full sized date, allow the date to immediately change, otherwise just move to the correct month without actually changing it
        if (this.selectionStart >= 10) {
          fp.setDate(inputValue);
        } else {
          fp.jumpToDate(inputValue);
        }
      }
    }
  }

  @Listen('blur')
  handleBlur() {
    const { fp, inputValue } = this;

    if (fp) {
      if (!Number.isNaN(new Date(inputValue))) {
        fp.setDate(inputValue);
      }
    }
  }

  componentDidLoad() {
    enqueueIdleCallback(() => {
      this.buildDateTimePicker();
    });
  }

  componentShouldUpdate(_: any, __: any, propName: string) {
    switch (propName) {
      case 'placeholder':
      case 'inputType':
      case 'iconName': {
        return true;
      }

      default: {
        return false;
      }
    }
  }

  render() {
    const { placeholder, inputInitialType: inputType, iconName } = this;

    return (
      <Host>
        <brx-input placeholder={placeholder} type={inputType} class="has-icon" data-input="data-input">
          {iconName && (
            <brx-button slot="end-button" size="small" type="button" circle aria-label="Abrir Timepicker" data-toggle="data-toggle">
              <brx-icon name={iconName}></brx-icon>
            </brx-button>
          )}
        </brx-input>

        <slot></slot>
      </Host>
    );
  }
}
