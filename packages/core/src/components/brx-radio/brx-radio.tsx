// This file was based on the <ion-radio /> from the Ionic Framework (MIT)
// https://github.com/ionic-team/ionic-framework/blob/d13a14658df2723aff908a94181cb563cb1f5b43/core/src/components/radio/radio.tsx

import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, Watch } from '@stencil/core';
import { RadioChangeEventDetail, RadioUpdateEventDetail } from './brx-radio-interface';
import { enqueueIdleCallback, generateUniqueId } from '../../utils/helpers';
import { State } from '@stencil/core';
import { TOKEN_UNCONTROLLED } from '../../tokens';

@Component({
  tag: 'brx-radio',
  styleUrl: 'brx-radio.scss',
  shadow: false,
})
export class BrxRadio implements ComponentInterface {
  private nativeInput!: HTMLInputElement;
  private radioGroup: HTMLBrxRadioGroupElement | null = null;

  @Element()
  el!: HTMLBrxRadioElement;

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

  @Event()
  brxUpdate!: EventEmitter<RadioUpdateEventDetail>;

  /**
   * If `true`, the radio is selected.
   */
  @Prop()
  checked: boolean | undefined;

  @Prop()
  controlledChecked: boolean | TOKEN_UNCONTROLLED = TOKEN_UNCONTROLLED;

  @State()
  currentChecked = false;

  @Watch('checked')
  @Watch('controlledChecked')
  syncCurrentChecked() {
    const incomingChecked = this.controlledChecked !== TOKEN_UNCONTROLLED ? this.controlledChecked : this.checked;
    this.currentChecked = incomingChecked;
  }

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

  @Method()
  async setFocus() {
    // event.stopPropagation();
    // event.preventDefault();
    this.el.focus();
  }

  @Method()
  async setButtonTabindex(value: number) {
    this.buttonTabindex = value;
  }

  @Watch('value')
  @Watch('currentChecked')
  emitUpdateEvent() {
    const value = this.value;
    const checked = this.currentChecked;
    this.brxUpdate.emit({ value, checked });
  }

  emitChangeEvent(checked = this.currentChecked, force = false) {
    const value = this.value;

    if (checked || force) {
      this.brxChange.emit({ checked, value });
    }
  }

  @Watch('value')
  @Watch('currentChecked')
  handleStateChange() {
    this.emitChangeEvent();
  }

  setState(checked: boolean) {
    if (this.controlledChecked === TOKEN_UNCONTROLLED) {
      this.currentChecked = checked;
    }

    this.emitChangeEvent(checked);
  }

  @Method()
  async getCurrentState() {
    return {
      value: this.value,
      checked: this.currentChecked,
    };
  }

  @Listen('brxChange', { target: 'window', passive: true })
  watchGlobalChange(event: CustomEvent<any>) {
    const target = event.target as HTMLElement | null;

    const brxRadioTrigger = target?.closest('brx-radio');

    if (brxRadioTrigger && brxRadioTrigger !== this.el) {
      const detail = event.detail as RadioChangeEventDetail;

      if (detail.checked) {
        enqueueIdleCallback(() => {
          this.syncCheckedFromNative();
        });
      }
    }
  }

  private updateState = () => {
    if (this.radioGroup) {
      this.currentChecked = this.radioGroup.value === this.value;
    }
  };

  private syncCheckedFromNative = () => {
    if (this.nativeInput) {
      this.setState(this.nativeInput?.checked);
    }
  };

  private onChange = (event: Event) => {
    event.preventDefault();
    this.syncCheckedFromNative();
  };

  private onFocus = () => {
    this.brxFocus.emit();
  };

  private onBlur = () => {
    this.brxBlur.emit();
  };

  connectedCallback() {
    this.radioGroup = this.el.closest('brx-radio-group');
    const radioGroup = this.radioGroup;

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

  componentWillLoad() {
    if (this.inputId === undefined) {
      this.inputId = generateUniqueId();
    }

    this.syncCurrentChecked();
  }

  render() {
    const labelId = `${this.inputId}-lbl`;

    return (
      <Host
        role="radio"
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        disabled={this.disabled}
        aria-labelledby={labelId}
        tabindex={this.buttonTabindex}
        data-checked={this.currentChecked}
        aria-checked={`${this.currentChecked}`}
        aria-hidden={this.disabled ? 'true' : null}
      >
        <input
          id={this.inputId}
          type="radio"
          name={this.name}
          value={this.value}
          disabled={this.disabled}
          onChange={this.onChange}
          checked={this.currentChecked}
          ref={nativeEl => (this.nativeInput = nativeEl as HTMLInputElement)}
        />

        <label htmlFor={this.inputId} id={labelId}>
          {this.label}
        </label>
      </Host>
    );
  }
}
