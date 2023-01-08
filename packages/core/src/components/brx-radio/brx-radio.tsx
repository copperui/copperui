// This file was based on the <ion-radio /> from the Ionic Framework (MIT)
// https://github.com/ionic-team/ionic-framework/blob/d13a14658df2723aff908a94181cb563cb1f5b43/core/src/components/radio/radio.tsx

import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { generateUniqueId } from '../../utils/entropy';
import { RadioChangeEventDetail } from './brx-radio-interface';

@Component({
  tag: 'brx-radio',
  styleUrl: 'brx-radio.scss',
  shadow: false,
})
export class BrxRadio {
  private nativeInput!: HTMLInputElement;

  private radioGroup: HTMLBrxRadioGroupElement | null = null;

  @Element() el!: HTMLBrxRadioElement;

  /**
   * Emitted when the radio button has focus.
   */
  @Event()
  brxFocus!: EventEmitter<void>;

  /**
   * Emitted when the radio button loses focus.
   */
  @Event()
  brxBlur!: EventEmitter<void>;

  @Event()
  brxChange!: EventEmitter<RadioChangeEventDetail>;

  /**
   * If `true`, the radio is selected.
   */
  @Prop({ reflect: true, mutable: true })
  checked = false;

  /**
   * The tabindex of the radio button.
   * @internal
   */
  @Prop({ reflect: true })
  buttonTabindex = -1;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop({ reflect: true })
  name: string;

  /**
   * If `true`, the user cannot interact with the radio.
   */
  @Prop({ reflect: true })
  disabled = false;

  /**
   * the value of the radio.
   */
  @Prop({ reflect: true })
  value?: any | null;

  @Prop({ reflect: true })
  label: string;

  @Prop({ reflect: true, mutable: true })
  inputId: string | undefined;

  /** @internal */
  @Method()
  async setFocus(ev: any) {
    ev.stopPropagation();
    ev.preventDefault();
    this.el.focus();
  }

  /** @internal */
  @Method()
  async setButtonTabindex(value: number) {
    this.buttonTabindex = value;
  }

  @Watch('checked')
  checkedWatch() {
    if (this.checked) {
      this.brxChange.emit({ value: this.value });
    }
  }

  connectedCallback() {
    if (this.value === undefined) {
      this.value = this.inputId;
    }

    const radioGroup = (this.radioGroup = this.el.closest('brx-radio-group'));

    if (radioGroup) {
      this.updateState();
      radioGroup.addEventListener('brxChange', this.updateState);
    }
  }

  disconnectedCallback() {
    const radioGroup = this.radioGroup;

    if (radioGroup) {
      radioGroup.removeEventListener('brxChange', this.updateState);
      this.radioGroup = null;
    }
  }

  async componentWillLoad() {
    if (this.inputId === undefined) {
      this.inputId = await generateUniqueId();
    }
  }

  private updateState = () => {
    if (this.radioGroup) {
      this.checked = this.radioGroup.value === this.value;
    }
  };

  private onChange = e => {
    if (this.disabled) {
      e.preventDefault();
    }

    this.checked = this.nativeInput.checked;
  };

  private onFocus = () => {
    this.brxFocus.emit();
  };

  private onBlur = () => {
    this.brxBlur.emit();
  };

  render() {
    const { inputId, name, value, disabled, checked, buttonTabindex, label } = this;

    const labelId = `${inputId}-lbl`;

    return (
      <Host
        role="radio"
        disabled={disabled}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        tabindex={buttonTabindex}
        aria-labelledby={labelId}
        aria-checked={`${checked}`}
        aria-hidden={disabled ? 'true' : null}
      >
        <input
          id={inputId}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={this.onChange}
          ref={nativeEl => (this.nativeInput = nativeEl as HTMLInputElement)}
        />

        <label htmlFor={inputId} id={labelId}>
          {label}
        </label>
      </Host>
    );
  }
}
