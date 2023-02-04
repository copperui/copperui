import { Component, ComponentInterface, Element, h, Host, Listen, Prop, Watch } from '@stencil/core';
import type flatpickr from 'flatpickr';
import { Instance } from 'flatpickr/dist/types/instance';
import { CustomLocale } from 'flatpickr/dist/types/locale';
import { BaseOptions, Options } from 'flatpickr/dist/types/options';
import { findTarget, tryParseJSON } from '../../utils/helpers';
import { BrxInput } from '../brx-input/brx-input';

enum Type {
  DATE = 'date',
  TIME = 'time',
  DATETIME_LOCAL = 'datetime-local',
}

const DOMStrings = {
  coponent: '',
};

const getFlatpickr = async () => {
  const mod = await import('flatpickr');
  return mod.default;
};

const getDefaultLocale = async () => {
  const mod = await import('flatpickr/dist/l10n/pt');
  return mod.default.pt;
};

const getConfigForType = (type: Type) => {
  switch (type) {
    case Type.DATE: {
      return {
        format: 'd/m/Y',
        time: false,
        noCalendar: false,
      };
    }

    case Type.TIME: {
      return {
        format: 'H:i',
        time: true,
        noCalendar: true,
      };
    }

    case Type.DATETIME_LOCAL: {
      return {
        format: 'd/m/Y H:i',
        time: true,
        noCalendar: false,
      };
    }

    default: {
      return {
        format: 'd/m/Y',
        time: false,
        noCalendar: false,
      };
    }
  }
};

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

  @Prop()
  type: Type;

  @Prop()
  mode: 'single' | 'range' = 'single';

  @Prop()
  placeholder: string | undefined;

  @Prop()
  config: string | Options | undefined;

  get configParsed(): Partial<BaseOptions> {
    const config = tryParseJSON(this.config ?? {});
    return typeof config !== 'string' ? config : {};
  }

  get configNative() {
    const { format, noCalendar, time } = getConfigForType(this.type);

    return {
      allowInput: true,
      dateFormat: format,
      disableMobile: 'true',
      enableTime: time,
      minuteIncrement: 1,
      mode: this.mode,
      nextArrow: '<brx-button circle size="small" type="button"><brx-icon name="fa5/fas/chevron-right"></brx-icon></brx-button>',
      noCalendar: noCalendar,
      prevArrow: '<brx-button circle size="small" type="button"><brx-icon name="fa5/fas/chevron-left"></brx-icon></brx-button>',
      time_24hr: true,
      wrap: true,
    };
  }

  get configFlatpick() {
    return Object.assign({}, this.configParsed, this.configNative);
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

  get inputType(): BrxInput['type'] {
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

  get value() {
    return '';
  }

  /**
   * Adiciona máscara de data no input
   * @param {*} elm
   */
  _dateInputMask(elm: HTMLInputElement) {
    elm.setAttribute('maxlength', '10');
    elm.addEventListener('keypress', e => {
      if (e.keyCode < 47 || e.keyCode > 57) {
        e.preventDefault();
      }

      const len = elm.value.length;

      // TODO: ????
      // if (len !== 1 || len !== 3) {
      if (len !== 1 && len !== 3) {
        if (e.keyCode == 47) {
          e.preventDefault();
        }
      }

      if (len === 2) {
        elm.value += '/';
      }

      if (len === 5) {
        elm.value += '/';
      }
    });
  }

  /**
   *  Adiciona máscara de hora no input
   * @param {*} elm * Dom do elemento input
   */
  _dateTimeInputMask(elm: HTMLInputElement) {
    elm.setAttribute('maxlength', '16');
    elm.addEventListener('keypress', e => {
      if (e.keyCode < 47 || e.keyCode > 57) {
        e.preventDefault();
      }

      const len = elm.value.length;

      // TODO: ????
      if (len !== 1 && len !== 3) {
        if (e.keyCode == 47) {
          e.preventDefault();
        }
      }
      switch (len) {
        case 2:
          elm.value += '/';
          break;
        case 5:
          elm.value += '/';
          break;
        case 10:
          elm.value += ' ';
          break;
        case 13:
          elm.value += ':';
          break;

        default:
          break;
      }
    });
  }
  /**
   * Coloca máscara com range de data no input
   * @param {*} elm * Dom do elemento input
   */
  _dateRangeInputMask(elm: HTMLInputElement) {
    elm.setAttribute('maxlength', '25');

    elm.addEventListener('keypress', e => {
      if (e.keyCode < 47 || e.keyCode > 57) {
        e.preventDefault();
      }

      const len = elm.value.length;

      // TODO: ????
      // if (len !== 1 || len !== 3) {
      if (len !== 1 && len !== 3) {
        if (e.keyCode === 47) {
          e.preventDefault();
        }
      }

      this._positionRangeMask(elm, len);
    });
  }
  /**
   * Insere a máscara na Dom
   * @param {*} elm Dom do elemento input
   * @param {*} len Tamanho do elemento inserido
   */
  async _positionRangeMask(elm, len) {
    const language = await this.language;

    const tamSeparator = language.rangeSeparator.length;
    const daySeparator = 10 + tamSeparator + 2;
    const monthSeparator = 10 + tamSeparator + 5;
    elm.setAttribute('maxlength', 20 + tamSeparator);

    switch (len) {
      case 2:
        elm.value += '/';
        break;
      case 5:
        elm.value += '/';
        break;
      case 10:
        elm.value += language.rangeSeparator;
        break;
      case daySeparator:
        elm.value += '/';
        break;
      case monthSeparator:
        elm.value += '/';
        break;

      default:
        break;
    }
  }
  /**
   * Insere máscara de hora
   *
   * @param {*} elm dom do elemento input
   */
  _timeInputMask(elm: HTMLInputElement) {
    elm.setAttribute('maxlength', '5');
    elm.addEventListener('keypress', e => {
      if (e.keyCode < 47 || e.keyCode > 57) {
        e.preventDefault();
      }

      const len = elm.value.length;

      // TODO: ????
      // if (len !== 1 || len !== 3) {
      if (len !== 1 && len !== 3) {
        if (e.keyCode === 47) {
          e.preventDefault();
        }
      }

      if (len === 2) {
        elm.value += ':';
      }
    });
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

    switch (this.type) {
      case Type.DATE: {
        this._dateInputMask(this.inputEl);
        break;
      }

      case Type.TIME: {
        this._timeInputMask(this.inputEl);
        break;
      }

      case Type.DATETIME_LOCAL: {
        this._dateTimeInputMask(this.inputEl);
        break;
      }

      default: {
        if (this.mode === 'range') {
          this._dateRangeInputMask(this.inputEl);
        } else {
          this._dateInputMask(this.inputEl);
        }
        break;
      }
    }

    this.fp = flatpickr(this.el, this.configFlatpick);

    this.fp.config.onOpen.push(() => {
      document.querySelectorAll('.arrowUp').forEach(element => {
        element.classList.add('fas', 'fa-chevron-up');
      });

      document.querySelectorAll('.arrowDown').forEach(element => {
        element.classList.add('fas', 'fa-chevron-down');
      });
    });
  }

  @Listen('keyup')
  handleKeyup() {
    const { fp, value } = this;

    // TODO: ???
    const selectionStart = -1;

    if (fp) {
      if (!Number.isNaN(new Date(value))) {
        // if the cursor is at the end of the edit and we have a full sized date, allow the date to immediately change, otherwise just move to the correct month without actually changing it
        if (selectionStart >= 10) {
          fp.setDate(value);
        } else {
          fp.jumpToDate(value);
        }
      }
    }
  }

  @Listen('blur')
  handleBlur() {
    const { fp, value } = this;

    if (fp) {
      if (!Number.isNaN(new Date(value))) {
        fp.setDate(value);
      }
    }
  }

  async componentDidLoad() {
    await this.buildDateTimePicker();
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
    const { placeholder, inputType, iconName } = this;

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
