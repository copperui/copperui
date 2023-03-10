import { Component, ComponentInterface, Element, Event, EventEmitter, Fragment, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { AutocompleteTypes, TextFieldTypes } from '../../interfaces';
import { TOKEN_UNCONTROLLED } from '../../tokens';
import { generateUniqueId } from '../../utils/helpers';
import { inheritAriaAttributes } from '../../utils/inherited-attributes';
import { InputChangeEventDetail } from './brx-input.interface';

@Component({
  tag: 'brx-input',
  styleUrl: 'brx-input.scss',
  shadow: false,
})
export class BrxInput implements ComponentInterface {
  private nativeInput?: HTMLInputElement;
  private didBlurAfterEdit = false;
  private tabindex?: string | number;

  @Element()
  el!: HTMLElement;

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event()
  brxInput!: EventEmitter<KeyboardEvent>;

  /**
   * Emitted when the value has changed.
   */
  @Event()
  brxChange!: EventEmitter<InputChangeEventDetail>;

  /**
   * Emitted when the input loses focus.
   */
  @Event()
  brxBlur!: EventEmitter<void>;

  /**
   * Emitted when the input has focus.
   */
  @Event()
  brxFocus!: EventEmitter<void>;

  @Prop()
  value: string | number | undefined;

  @Prop()
  controlledValue: string | number | undefined | TOKEN_UNCONTROLLED = TOKEN_UNCONTROLLED;

  @State()
  currentValue: string | number | undefined;

  @Watch('value')
  @Watch('controlledValue')
  syncCurrentValueFromProps() {
    const targetValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
    this.currentValue = String(targetValue ?? '');
  }

  setValue(value: string | number) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = value;
    }

    this.brxChange.emit({ value });
  }

  @State()
  hasFocus = false;

  /**
   * If the value of the type attribute is `"file"`, then this attribute will indicate the types of files that the server accepts, otherwise it will be ignored. The value must be a comma-separated list of unique content type specifiers.
   */
  @Prop()
  accept?: string;

  /**
   * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
   */
  @Prop()
  autocapitalize = 'off';

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop()
  autocomplete: AutocompleteTypes = 'off';

  /**
   * Whether auto-correction should be enabled when the user is entering/editing the text value.
   */
  @Prop()
  autocorrect: 'on' | 'off' = 'off';

  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
   */
  @Prop()
  autofocus = false;

  /**
   * If `true`, a clear icon will appear in the input when there is a value. Clicking it clears the input.
   */
  @Prop()
  clearInput = false;

  /**
   * If `true`, the value will be cleared after focus upon edit. Defaults to `true` when `type` is `"password"`, `false` for all other types.
   */
  @Prop()
  clearOnEdit?: boolean;

  /**
   * If `true`, the user cannot interact with the input.
   */
  @Prop()
  disabled = false;

  /**
   * A hint to the browser for which enter key to display.
   * Possible values: `"enter"`, `"done"`, `"go"`, `"next"`,
   * `"previous"`, `"search"`, and `"send"`.
   */
  @Prop()
  enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

  /**
   * A hint to the browser for which keyboard to display.
   * Possible values: `"none"`, `"text"`, `"tel"`, `"url"`,
   * `"email"`, `"numeric"`, `"decimal"`, and `"search"`.
   */
  @Prop()
  inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';

  /**
   * The maximum value, which must not be less than its minimum (min attribute) value.
   */
  @Prop()
  max?: string;

  /**
   * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.
   */
  @Prop()
  maxlength?: number;

  /**
   * The minimum value, which must not be greater than its maximum (max attribute) value.
   */
  @Prop()
  min?: string;

  /**
   * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.
   */
  @Prop()
  minlength?: number;

  /**
   * If `true`, the user can enter more than one value. This attribute applies when the type attribute is set to `"email"` or `"file"`, otherwise it is ignored.
   */
  @Prop()
  multiple?: boolean;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop()
  name: string;

  /**
   * A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, `"date"`, or `"password"`, otherwise it is ignored. When the type attribute is `"date"`, `pattern` will only be used in browsers that do not support the `"date"` input type natively. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date for more information.
   */
  @Prop()
  pattern?: string;

  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop()
  placeholder?: string | null;

  /**
   * If `true`, the user cannot modify the value.
   */
  @Prop()
  readonly = false;

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop()
  required = false;

  /**
   * If `true`, the element will have its spelling and grammar checked.
   */
  @Prop()
  spellcheck = false;

  /**
   * Works with the min and max attributes to limit the increments at which a value can be set.
   * Possible values are: `"any"` or a positive floating point number.
   */
  @Prop()
  step?: string;

  /**
   * The initial size of the control. This value is in pixels unless the value of the type attribute is `"text"` or `"password"`, in which case it is an integer number of characters. This attribute applies only when the `type` attribute is set to `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored.
   */
  @Prop()
  size?: number;

  /**
   * The type of control to display. The default type is text.
   */
  @Prop()
  type: TextFieldTypes = 'text';

  //

  @Prop()
  label: string;

  @Prop({ reflect: true })
  hiddenLabel: boolean;

  @Prop()
  labelClass: string;

  @Prop({ reflect: true })
  inline: boolean;

  @Prop({ mutable: true })
  inputId: string | undefined = undefined;

  @Prop({ reflect: true })
  density: 'small' | 'medium' | 'large' | undefined;

  @Prop()
  startIconName: string | undefined;

  @Prop({ reflect: true })
  color: 'success' | 'danger' | 'warning' | 'info' | undefined;

  @Prop()
  enablePasswordToggle = false;

  @State()
  showPassword = false;

  /**
   * Sets focus on the specified `my-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement> {
    return Promise.resolve(this.nativeInput!);
  }

  @Method()
  async toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  @Watch('enablePasswordToggle')
  setupShowPassword() {
    if (this.enablePasswordToggle) {
      this.showPassword = this.type === 'text';
    }
  }

  shouldClearOnEdit() {
    const { type, clearOnEdit } = this;
    return clearOnEdit === undefined ? type === 'password' : clearOnEdit;
  }

  getValue(): string {
    return String(this.currentValue ?? '');
  }

  onInput = (event: Event) => {
    const oldValue = this.getValue();
    const newValue = this.nativeInput.value;

    this.nativeInput.value = oldValue;
    this.setValue(newValue);

    this.brxInput.emit(event as KeyboardEvent);
  };

  onBlur = () => {
    this.hasFocus = false;
    this.focusChanged();
    this.brxBlur.emit();
  };

  onFocus = () => {
    this.hasFocus = true;
    this.focusChanged();
    this.brxFocus.emit();
  };

  onKeydown = (ev: KeyboardEvent) => {
    if (this.shouldClearOnEdit()) {
      // Did the input value change after it was blurred and edited?
      // Do not clear if user is hitting Enter to submit form
      if (this.didBlurAfterEdit && this.hasValue() && ev.key !== 'Enter') {
        // Clear the input
        this.clearTextInput();
      }

      // Reset the flag
      this.didBlurAfterEdit = false;
    }
  };

  clearTextInput = (event?: Event) => {
    if (this.clearInput && !this.readonly && !this.disabled && event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setValue('');
  };

  focusChanged() {
    // If clearOnEdit is enabled and the input blurred but has a value, set a flag
    if (!this.hasFocus && this.shouldClearOnEdit() && this.hasValue()) {
      this.didBlurAfterEdit = true;
    }
  }

  hasValue(): boolean {
    return this.getValue().length > 0;
  }

  get inheritedAttributes() {
    return inheritAriaAttributes(this.el);
  }

  componentWillLoad() {
    if (!this.inputId) {
      this.inputId = generateUniqueId();
    }

    this.syncCurrentValueFromProps();

    // If the my-input has a tabindex attribute we get the value
    // and pass it down to the native input, then remove it from the
    // my-input to avoid causing tabbing twice on the same element
    if (this.el.hasAttribute('tabindex')) {
      const tabindex = this.el.getAttribute('tabindex');
      this.tabindex = tabindex !== null ? tabindex : undefined;
      this.el.removeAttribute('tabindex');
    }
  }

  render() {
    const { disabled, hiddenLabel, labelClass, startIconName, inputId, enablePasswordToggle, showPassword, inheritedAttributes } = this;

    const value = this.getValue();
    const labelId = inputId + '-lbl';

    const type = enablePasswordToggle ? (showPassword ? 'text' : 'password') : this.type;

    return (
      <Host aria-disabled={disabled ? 'true' : null}>
        <div class="brx-input-label">
          <label class={`${hiddenLabel ? 'sr-only' : ''} ${labelClass}`} id={labelId} htmlFor={this.inputId}>
            {this.label}
          </label>
        </div>

        <div class="brx-input-content">
          <div class="brx-input-group">
            {startIconName && (
              <div class="brx-input-icon">
                <brx-icon name={startIconName}></brx-icon>
              </div>
            )}

            <input
              type={type}
              id={inputId}
              value={value}
              min={this.min}
              max={this.max}
              step={this.step}
              size={this.size}
              name={this.name}
              disabled={disabled}
              accept={this.accept}
              pattern={this.pattern}
              tabindex={this.tabindex}
              multiple={this.multiple}
              readOnly={this.readonly}
              required={this.required}
              aria-labelledby={labelId}
              minLength={this.minlength}
              maxLength={this.maxlength}
              inputMode={this.inputmode}
              autoFocus={this.autofocus}
              autoCorrect={this.autocorrect}
              autoComplete={this.autocomplete}
              enterKeyHint={this.enterkeyhint}
              autoCapitalize={this.autocapitalize}
              placeholder={this.placeholder || ''}
              spellcheck={this.spellcheck ? 'true' : undefined}
              onBlur={this.onBlur}
              onInput={this.onInput}
              onFocus={this.onFocus}
              onKeyDown={this.onKeydown}
              ref={input => void (this.nativeInput = input)}
              {...inheritedAttributes}
            />

            {this.clearInput && !this.readonly && !this.disabled && (
              <button
                type="button"
                tabindex="-1"
                onClick={this.clearTextInput}
                onMouseDown={this.clearTextInput}
                onTouchStart={this.clearTextInput}
                onPointerDown={event => void event.preventDefault()}
              >
                <brx-icon name="fa5/fas/times"></brx-icon>
              </button>
            )}

            {enablePasswordToggle && (
              <Fragment>
                <brx-button size="small" aria-label="Mostrar senha" onClick={() => this.toggleShowPassword()}>
                  <brx-icon name={showPassword ? 'fa5/fas/eye-slash' : 'fa5/fas/eye'}></brx-icon>
                </brx-button>
              </Fragment>
            )}
          </div>

          <slot name={'end-button'}></slot>
        </div>

        <slot name="helper"></slot>

        <slot></slot>
      </Host>
    );
  }
}
