// This file was based on the <ion-checkbox /> from the Ionic Framework (MIT)
// https://github.com/ionic-team/ionic-framework/blob/d13a14658df2723aff908a94181cb563cb1f5b43/core/src/components/checkbox/checkbox.tsx

import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { TOKEN_UNCONTROLLED } from '../../tokens';
import { generateUniqueId } from '../../utils/helpers';
import { SwitchChangeEventDetail, SwitchUpdateEventDetail } from './brx-switch-interface';

@Component({
  tag: 'brx-switch',
  styleUrl: 'brx-switch.scss',
  shadow: false,
})
export class BrxSwitch implements ComponentInterface {
  private nativeInput?: HTMLInputElement;

  @Element()
  el!: HTMLElement;

  /**
   * Emitted when the checked property has changed.
   */
  @Event()
  brxChange!: EventEmitter<SwitchChangeEventDetail>;

  /**
   * Emitted when the state has changed.
   */
  @Event()
  brxUpdate!: EventEmitter<SwitchUpdateEventDetail>;

  /**
   * Emitted when the checkbox has focus.
   */
  @Event()
  brxFocus!: EventEmitter<void>;

  /**
   * Emitted when the checkbox loses focus.
   */
  @Event()
  brxBlur!: EventEmitter<void>;

  @Prop()
  label: string | undefined;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop({ reflect: true })
  name: string;

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop()
  checked: boolean | null = null;

  @Prop()
  controlledChecked: boolean | TOKEN_UNCONTROLLED = TOKEN_UNCONTROLLED;

  /**
   * If `true`, the checkbox will visually appear as indeterminate.
   */
  @Prop()
  indeterminate = false;

  @State()
  currentChecked = false;

  @State()
  currentIndeterminate = false;

  @Watch('value')
  @Watch('currentChecked')
  @Watch('currentIndeterminate')
  emitUpdateEvent() {
    const value = this.value;
    const checked = this.currentChecked;
    const indeterminate = this.currentIndeterminate;

    this.brxUpdate.emit({ checked, indeterminate, value });
  }

  @Watch('value')
  @Watch('currentChecked')
  @Watch('currentIndeterminate')
  emitChangeEvent(checked = this.currentChecked, indeterminate = this.currentIndeterminate) {
    const { value } = this;
    this.brxChange.emit({ checked, indeterminate, value });
  }

  @Watch('checked')
  @Watch('controlledChecked')
  syncCurrentChecked() {
    this.currentChecked = this.controlledChecked !== TOKEN_UNCONTROLLED ? this.controlledChecked : this.checked;
  }

  @Watch('indeterminate')
  syncCurrentIndeterminate() {
    this.currentIndeterminate = this.indeterminate;
  }

  syncCurrent() {
    this.syncCurrentChecked();
    this.syncCurrentIndeterminate();
  }

  /**
   * If `true`, the user cannot interact with the checkbox.
   */
  @Prop({ reflect: true })
  disabled = false;

  @Prop({ reflect: true })
  icon = false;

  @Prop({ reflect: true })
  size: 'small' | 'medium' = 'medium';

  @Prop({ reflect: true })
  alignLabel: 'right' | 'top' | undefined;

  @Prop({ reflect: true })
  valid: boolean;

  @Prop({ reflect: true })
  danger: boolean;

  @Prop({ reflect: true })
  invalid: boolean;

  @Prop({ reflect: true })
  state: 'valid' | 'invalid' | 'danger' | undefined = undefined;

  @Prop({ reflect: true })
  darkMode = false;

  @Prop({ reflect: true })
  hiddenLabel = false;

  @Prop({ mutable: true })
  inputId: string | undefined;

  @Prop()
  labelEnabled = '';

  @Prop()
  labelDisabled = '';

  /**
   * The value of the checkbox does not mean if it's checked or not, use the `checked`
   * property for that.
   *
   * The value of a checkbox is analogous to the value of an `<input type="checkbox">`,
   * it's only used when the checkbox participates in a native `<form>`.
   */
  @Prop({ reflect: true })
  value: any | null = 'on';

  @Method()
  async getCurrentState() {
    return {
      value: this.value,
      checked: this.currentChecked,
      indeterminate: this.currentIndeterminate,
    };
  }

  @Method()
  setState(checked: boolean, indeterminate: boolean) {
    if (this.controlledChecked === TOKEN_UNCONTROLLED) {
      this.currentChecked = checked;
      this.currentIndeterminate = indeterminate;
    }

    this.emitChangeEvent(checked, indeterminate);

    return Promise.resolve();
  }

  @Method()
  async getNativeChecked() {
    return this.nativeInput?.checked;
  }

  componentWillLoad() {
    if (this.inputId === undefined) {
      this.inputId = generateUniqueId();
    }

    this.syncCurrent();
  }

  private setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }

  private onChange = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const target = event.target as HTMLInputElement;
    target.checked = this.currentChecked;

    this.setFocus();
    this.setState(!this.currentChecked, false);
  };

  private onBlur = () => {
    this.brxBlur.emit();
  };

  private onFocus = () => {
    this.brxFocus.emit();
  };

  get labelText() {
    return this.label;
  }

  render() {
    const isSwitchDataEnabled = (this.labelEnabled ?? '').length > 0 || (this.labelDisabled ?? '').length > 0;

    return (
      <Host
        role="checkbox"
        data-checked={this.currentChecked}
        aria-checked={`${this.currentChecked}`}
        aria-hidden={this.disabled ? 'true' : null}
        data-indeterminate={this.currentIndeterminate}
      >
        <input
          type="checkbox"
          id={this.inputId}
          onChange={this.onChange}
          disabled={this.disabled}
          checked={this.currentChecked}
          name={this.name ?? this.inputId}
          indeterminate={this.currentIndeterminate}
          aria-checked={`${this.currentChecked}`}
          onBlur={() => this.onBlur()}
          onFocus={() => this.onFocus()}
          ref={focusEl => (this.nativeInput = focusEl)}
        />

        <label htmlFor={this.inputId}>{this.labelText}</label>

        {isSwitchDataEnabled && <div class="switch-data" data-enabled={this.labelEnabled} data-disabled={this.labelDisabled} />}

        <slot></slot>
      </Host>
    );
  }
}
