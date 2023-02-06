import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { TOKEN_UNCONTROLLED } from '../../tokens';
import { generateUniqueId } from '../../utils/helpers';
import { inheritAriaAttributes, inheritAttributes } from '../../utils/inherited-attributes';
import { TextareaChangeEventDetail } from './brx-textarea-interface';

@Component({
  tag: 'brx-textarea',
  styleUrl: 'brx-textarea.scss',
  shadow: false,
})
export class BrxTextarea implements ComponentInterface {
  private didBlurAfterEdit = false;
  private nativeInput: HTMLTextAreaElement | null = null;

  @Element()
  el!: HTMLElement;

  hasValue(): boolean {
    return this.getValue() !== '';
  }

  getValue(): string {
    return String(this.currentValue ?? '');
  }

  /**
   * Emitted when the input value has changed.
   */
  @Event()
  brxChange!: EventEmitter<TextareaChangeEventDetail>;

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event()
  brxInput!: EventEmitter<InputEvent>;

  /**
   * Emitted when the input loses focus.
   */
  @Event()
  brxBlur!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the input has focus.
   */
  @Event()
  brxFocus!: EventEmitter<FocusEvent>;

  @Prop({ mutable: true })
  inputId: string;

  @Prop()
  value: string | null | undefined = undefined;

  @Prop()
  controlledValue: string | null | undefined | TOKEN_UNCONTROLLED = TOKEN_UNCONTROLLED;

  @State()
  currentValue: string | null = '';

  @Watch('value')
  @Watch('controlledValue')
  syncCurrentValueFromProps() {
    const targetValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
    this.currentValue = String(targetValue ?? '');
  }

  setValue(value: string) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = value;
    }

    this.brxChange.emit({ value: value });
  }

  @Prop()
  darkMode: boolean;

  @Prop()
  label: string;

  @Prop()
  inline: boolean;

  @Prop()
  counter?: 'limit' | 'total';

  @Prop()
  color: 'success' | 'danger' | 'warning' | 'info';

  /**
   * This is required for a WebKit bug which requires us to
   * blur and focus an input to properly focus the input in
   * an item with delegatesFocus. It will no longer be needed
   * with iOS 14.
   *
   * @internal
   */
  @Prop()
  fireFocusEvents = true;

  /**
   * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
   * Available optbrxs: `"off"`, `"none"`, `"on"`, `"sentences"`, `"words"`, `"characters"`.
   */
  @Prop()
  autocapitalize = 'none';

  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
   */
  @Prop()
  autofocus = false;

  /**
   * If `true`, the value will be cleared after focus upon edit. Defaults to `true` when `type` is `"password"`, `false` for all other types.
   */
  @Prop({ mutable: true })
  clearOnEdit = false;

  /**
   * If `true`, the user cannot interact with the textarea.
   */
  @Prop()
  disabled = false;

  /**
   * A hint to the browser for which keyboard to display.
   * Possible values: `"none"`, `"text"`, `"tel"`, `"url"`,
   * `"email"`, `"numeric"`, `"decimal"`, and `"search"`.
   */
  @Prop()
  inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';

  /**
   * A hint to the browser for which enter key to display.
   * Possible values: `"enter"`, `"done"`, `"go"`, `"next"`,
   * `"previous"`, `"search"`, and `"send"`.
   */
  @Prop()
  enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

  /**
   * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.
   */
  @Prop()
  maxlength?: number;

  /**
   * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.
   */
  @Prop()
  minlength?: number;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop()
  name: string;

  /**
   * Instructbrxal text that shows before the input has a value.
   */
  @Prop()
  placeholder?: string;

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
   * The visible width of the text control, in average character widths. If it is specified, it must be a positive integer.
   */
  @Prop()
  cols?: number;

  /**
   * The number of visible text lines for the control.
   */
  @Prop()
  rows?: number;

  /**
   * Indicates how the control wraps text.
   */
  @Prop()
  wrap?: 'hard' | 'soft' | 'off';

  @State()
  hasFocus = false;

  /**
   * Sets focus on the native `textarea` in `brx-textarea`. Use this method instead of the global
   * `textarea.focus()`.
   */
  @Method()
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }

  /**
   * Sets blur on the native `textarea` in `brx-textarea`. Use this method instead of the global
   * `textarea.blur()`.
   * @internal
   */
  @Method()
  async setBlur() {
    if (this.nativeInput) {
      this.nativeInput.blur();
    }
  }

  /**
   * Returns the native `<textarea>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLTextAreaElement> {
    return Promise.resolve(this.nativeInput!);
  }

  /**
   * Check if we need to clear the text input if clearOnEdit is enabled
   */
  checkClearOnEdit() {
    if (!this.clearOnEdit) {
      return;
    }

    // Did the input value change after it was blurred and edited?
    if (this.didBlurAfterEdit && this.hasValue()) {
      // Clear the input
      this.currentValue = '';
    }

    // Reset the flag
    this.didBlurAfterEdit = false;
  }

  focusChange() {
    // If clearOnEdit is enabled and the input blurred but has a value, set a flag
    if (this.clearOnEdit && !this.hasFocus && this.hasValue()) {
      this.didBlurAfterEdit = true;
    }
  }

  onInput = (event: Event) => {
    const oldValue = this.getValue();
    const newValue = this.nativeInput.value;

    this.nativeInput.value = oldValue;
    this.setValue(newValue);

    this.brxInput.emit(event as InputEvent);
  };

  onFocus = (event: FocusEvent) => {
    this.hasFocus = true;
    this.focusChange();

    if (this.fireFocusEvents) {
      this.brxFocus.emit(event);
    }
  };

  onBlur = (ev: FocusEvent) => {
    this.hasFocus = false;
    this.focusChange();

    if (this.fireFocusEvents) {
      this.brxBlur.emit(ev);
    }
  };

  onKeyDown = () => {
    this.checkClearOnEdit();
  };

  componentWillLoad() {
    if (!this.inputId) {
      this.inputId = generateUniqueId();
    }

    this.syncCurrentValueFromProps();
  }

  get inheritedAttributes() {
    return {
      ...inheritAriaAttributes(this.el),
      ...inheritAttributes(this.el, ['data-form-type', 'title']),
    };
  }

  render() {
    const value = this.getValue();
    const labelId = this.inputId + '-lbl';

    return (
      <Host aria-disabled={this.disabled ? 'true' : null}>
        <div class={this.inline ? 'row' : ''}>
          <div class="col-auto pt-half">
            <label htmlFor={this.inputId}>{this.label}</label>
          </div>

          <div class="col">
            <textarea
              value={value}
              cols={this.cols}
              rows={this.rows}
              wrap={this.wrap}
              name={this.name}
              id={this.inputId}
              required={this.required}
              readOnly={this.readonly}
              disabled={this.disabled}
              minLength={this.minlength}
              maxLength={this.maxlength}
              autoFocus={this.autofocus}
              inputMode={this.inputmode}
              spellcheck={this.spellcheck}
              enterKeyHint={this.enterkeyhint}
              aria-labelledby={labelId ?? null}
              autoCapitalize={this.autocapitalize}
              ref={el => (this.nativeInput = el)}
              placeholder={this.placeholder || ''}
              onInput={this.onInput}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              onKeyDown={this.onKeyDown}
              {...this.inheritedAttributes}
            >
              {value}
            </textarea>

            {this.counter === 'limit' && typeof this.maxlength === 'number' && (
              <div class="text-base mt-1">
                {value.length === 0 && (
                  <span class="limit">
                    Limite máximo de <strong>{this.maxlength}</strong> caracteres.
                  </span>
                )}

                {value.length > 0 && <span class="current">Restam {Math.max(this.maxlength - value.length, 0)} caracteres.</span>}
              </div>
            )}

            {this.counter === 'total' && (
              <div class="text-base mt-1">
                <span class="characters">
                  <strong>{value.length}</strong> caracteres digitados.
                </span>
              </div>
            )}

            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
