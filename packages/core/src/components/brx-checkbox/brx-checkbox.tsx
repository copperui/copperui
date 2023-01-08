import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { generateUniqueId } from '../../utils/entropy';
import { CheckboxChangeEventDetail } from './brx-checkbox-interface';

@Component({
  tag: 'brx-checkbox',
  styleUrl: 'brx-checkbox.scss',
  shadow: false,
})
export class BrxCheckbox {
  private focusEl?: HTMLElement;

  @Element() el!: HTMLElement;

  @Prop({ reflect: true })
  label: string | undefined;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop({ reflect: true })
  name: string;

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop({ reflect: true, mutable: true })
  checked: boolean | undefined = false;

  /**
   * If `true`, the checkbox will visually appear as indeterminate.
   */
  @Prop({ mutable: true })
  indeterminate = false;

  /**
   * If `true`, the user cannot interact with the checkbox.
   */
  @Prop({ reflect: true })
  disabled = false;

  @Prop({ reflect: true })
  valid: boolean | undefined;

  @Prop({ reflect: true })
  invalid: boolean | undefined;

  /**
   * The value of the checkbox does not mean if it's checked or not, use the `checked`
   * property for that.
   *
   * The value of a checkbox is analogous to the value of an `<input type="checkbox">`,
   * it's only used when the checkbox participates in a native `<form>`.
   */
  @Prop({ reflect: true })
  value: any | null = 'on';

  @Prop({ reflect: true })
  hiddenLabel = false;

  @Prop({ reflect: true })
  size: 'small' | 'medium' = 'medium';

  @Prop({ reflect: true })
  state: 'invalid' | 'danger' | undefined = undefined;

  @Prop({ reflect: true })
  darkMode = false;

  /**
   * Emitted when the checked property has changed.
   */
  @Event() brxChange!: EventEmitter<CheckboxChangeEventDetail>;

  /**
   * Emitted when the checkbox has focus.
   */
  @Event() brxFocus!: EventEmitter<void>;

  /**
   * Emitted when the checkbox loses focus.
   */
  @Event() brxBlur!: EventEmitter<void>;

  @Watch('checked')
  checkedStateChanged(isChecked: boolean) {
    this.brxChange.emit({
      checked: isChecked,
      value: this.value,
    });
  }

  private setFocus() {
    if (this.focusEl) {
      this.focusEl.focus();
    }
  }

  private onChange = (ev: any) => {
    ev.preventDefault();
    this.setFocus();
    this.checked = !this.checked;
    this.indeterminate = false;
  };

  private onFocus = () => {
    this.brxFocus.emit();
  };

  private onBlur = () => {
    this.brxBlur.emit();
  };

  @Prop({ reflect: true, mutable: true })
  inputId: string | undefined;

  async componentWillLoad() {
    if (this.inputId === undefined) {
      this.inputId = await generateUniqueId();
    }
  }

  render() {
    const checked = this.checked;

    return (
      <Host aria-checked={`${checked}`} aria-hidden={this.disabled ? 'true' : null} role="checkbox">
        <input
          type="checkbox"
          id={this.inputId}
          checked={checked}
          disabled={this.disabled}
          aria-checked={`${checked}`}
          onBlur={() => this.onBlur()}
          onFocus={() => this.onFocus()}
          name={this.name ?? this.inputId}
          onChange={() => this.onChange({})}
          ref={focusEl => (this.focusEl = focusEl)}
        />

        <label htmlFor={this.inputId}>{this.label}</label>

        <slot></slot>
      </Host>
    );
  }
}
