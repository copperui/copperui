// This file was based on the <ion-radio /> from the Ionic Framework (MIT)
// https://github.com/ionic-team/ionic-framework/blob/d13a14658df2723aff908a94181cb563cb1f5b43/core/src/components/radio/radio.tsx

import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { isControlled, TOKEN_UNCONTROLLED } from '../../tokens';
import { enqueueIdleCallback, findTarget, findTargets, generateUniqueId } from '../../utils/helpers';
import { RadioGroupUpdateEventDetail } from '../brx-radio-group/brx-radio-group-interface';
import { RadioChangeEventDetail, RadioUpdateEventDetail } from './brx-radio-interface';

@Component({
  tag: 'brx-radio',
  styleUrl: 'brx-radio.scss',
  shadow: false,
})
export class BrxRadio implements ComponentInterface {
  @Element()
  el!: HTMLBrxRadioElement;

  get nativeInput() {
    return findTarget<HTMLInputElement>('input', this.el);
  }

  get nativeInputChecked() {
    return this.nativeInput?.checked ?? false;
  }

  set nativeInputChecked(value) {
    if (this.nativeInput) {
      this.nativeInput.checked = value;
    }
  }

  get radioGroup() {
    return this.el.closest('brx-radio-group') ?? null;
  }

  get isStandaloneFamilyControlled() {
    const standaloneGroupRadios = findTargets<HTMLBrxRadioElement>(`brx-radio[name="${this.name}"]`);
    return standaloneGroupRadios.some(brxRadio => isControlled(brxRadio.controlledChecked));
  }

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
  controlledChecked: boolean | undefined | TOKEN_UNCONTROLLED = TOKEN_UNCONTROLLED;

  @State()
  currentChecked = false;

  emitChange(checked = this.currentChecked, force = false) {
    const value = this.value;

    if (checked || force) {
      this.brxChange.emit({ value, checked });
    }
  }

  @Watch('checked')
  @Watch('controlledChecked')
  syncCurrentChecked() {
    const incomingChecked = this.controlledChecked !== TOKEN_UNCONTROLLED ? this.controlledChecked : this.checked;
    this.currentChecked = incomingChecked;
  }

  @Watch('value')
  @Watch('currentChecked')
  handleStateChange() {
    this.emitChange();
  }

  @Watch('currentChecked')
  handleCurrentCheckedChange() {
    this.nativeInputChecked = this.currentChecked;
  }

  setChecked(checked: boolean = false) {
    if (!isControlled(this.controlledChecked) && !this.radioGroup && !this.isStandaloneFamilyControlled) {
      // Unecessary to emit change because the watch of currentChecked will handle it
      this.currentChecked = checked;
    } else {
      this.emitChange(checked);
    }
  }

  private prevValue: any = null;
  private prevCurrentChecked: any = null;

  @Watch('value')
  @Watch('currentChecked')
  emitUpdateEvent() {
    console.count('emitUpdateEvent');

    const value = this.value;
    const checked = this.currentChecked;

    if (value !== this.prevValue || checked !== this.prevCurrentChecked) {
      this.brxUpdate.emit({ value, checked });
    }

    this.prevValue = value;
    this.prevCurrentChecked = checked;
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

  @Method()
  async getCurrentState() {
    return {
      value: this.value,
      checked: this.currentChecked,
    };
  }

  private syncCheckedFromRadioGroup = async () => {
    const radioGroup = this.radioGroup;

    if (radioGroup) {
      const radioGroupValue = await radioGroup.getCurrentValue();
      const isChecked = radioGroupValue === this.value;

      this.currentChecked = isChecked;
      this.nativeInputChecked = isChecked;
    }
  };

  private syncCheckedFromNative = () => {
    this.setChecked(this.nativeInputChecked);
  };

  private onFocus = () => {
    this.brxFocus.emit();
  };

  private onBlur = () => {
    this.brxBlur.emit();
  };

  private onChange = (event: Event) => {
    event.preventDefault();

    const oldChecked = this.currentChecked;
    const newChecked = this.nativeInputChecked;

    this.nativeInputChecked = oldChecked;
    this.setChecked(newChecked);
  };

  @Listen('brxChange', { target: 'window', passive: true })
  handleGlobalRadioChange(event: CustomEvent<any>) {
    const target = event.target as HTMLElement | null;

    const brxRadio = target?.closest('brx-radio');

    if (brxRadio) {
      if (this.currentChecked !== this.nativeInputChecked) {
        this.nativeInputChecked = this.currentChecked;

        if (!this.radioGroup) {
          enqueueIdleCallback(() => {
            this.syncCheckedFromNative();
          });
        }
      }
    }
  }

  @Listen('brxRadioGroupUpdate', { target: 'window', passive: true })
  handleGlobalRadioGroupUpdate(event: CustomEvent<RadioGroupUpdateEventDetail>) {
    const target = event.target as HTMLElement | null;

    const brxRadioGroup = target?.closest('brx-radio-group');

    if (brxRadioGroup && brxRadioGroup === this.radioGroup) {
      this.syncCheckedFromRadioGroup();
    }
  }

  connectedCallback() {
    this.syncCheckedFromRadioGroup();
  }

  componentWillLoad() {
    if (!this.inputId) {
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
        <input type="radio" name={this.name} id={this.inputId} value={this.value} disabled={this.disabled} onChange={this.onChange} checked={this.currentChecked} />

        <label htmlFor={this.inputId} id={labelId}>
          {this.label}
        </label>
      </Host>
    );
  }
}
