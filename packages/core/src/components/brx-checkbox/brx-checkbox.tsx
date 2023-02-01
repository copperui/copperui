// This file was based on the <ion-checkbox /> from the Ionic Framework (MIT)
// https://github.com/ionic-team/ionic-framework/blob/d13a14658df2723aff908a94181cb563cb1f5b43/core/src/components/checkbox/checkbox.tsx

import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { TOKEN_UNCONTROLLED } from '../../tokens';
import { findTargets, generateUniqueId } from '../../utils/helpers';
import { CheckboxChangeEventDetail, CheckboxUpdateEventDetail } from './brx-checkbox-interface';

@Component({
  tag: 'brx-checkbox',
  styleUrl: 'brx-checkbox.scss',
  shadow: false,
})
export class BrxCheckbox implements ComponentInterface {
  private syncInProgress = false;
  private nativeInput?: HTMLInputElement;

  @Element()
  el!: HTMLElement;

  /**
   * Emitted when the checked property has changed.
   */
  @Event()
  brxChange!: EventEmitter<CheckboxChangeEventDetail>;

  /**
   * Emitted when the state has changed.
   */
  @Event()
  brxUpdate!: EventEmitter<CheckboxUpdateEventDetail>;

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
  size: 'small' | 'medium' = 'medium';

  @Prop({ reflect: true })
  valid: boolean | undefined;

  @Prop({ reflect: true })
  danger: boolean | undefined;

  @Prop({ reflect: true })
  invalid: boolean | undefined;

  @Prop({ reflect: true })
  state: 'valid' | 'invalid' | 'danger' | undefined = undefined;

  @Prop({ reflect: true })
  darkMode = false;

  @Prop({ reflect: true })
  hiddenLabel = false;

  @Prop({ mutable: true })
  inputId: string | undefined;

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
  child: string | undefined;

  @Prop({ reflect: true, attribute: 'parent' })
  propParent: string | boolean | undefined;

  @Prop()
  checkAllLabel: string = 'Selecionar tudo';

  @Prop()
  uncheckAllLabel: string = 'Desselecionar tudo';

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

  get parent() {
    const { propParent: _parent } = this;
    return _parent === '' ? true : _parent;
  }

  get isParent() {
    return !!this.parent;
  }

  get isChild() {
    return !!this.child;
  }

  getCheckgroupChildren(): HTMLBrxCheckboxElement[] {
    const parent = this.parent;

    if (parent) {
      const documentChildren = typeof parent === 'string' ? findTargets<HTMLBrxCheckboxElement>(`brx-checkbox[child="${parent}"]`) : [];

      const parentGroup = this.el.closest('brx-checkgroup');
      const parentGroupAllCheckboxes = Array.from(parentGroup?.querySelectorAll('brx-checkbox') ?? []);

      const observableCheckboxes = parentGroupAllCheckboxes
        .filter(checkbox => checkbox !== this.el)
        .filter(checkbox => {
          const groupLevel1 = checkbox.closest('brx-checkgroup');
          const groupLevel2 = groupLevel1.parentElement.closest('brx-checkgroup');
          return groupLevel1 === parentGroup || groupLevel2 === parentGroup;
        });

      return [...documentChildren, ...observableCheckboxes];
    }

    return [];
  }

  async getCheckgroupState() {
    const allStates = await Promise.all(this.getCheckgroupChildren().map(i => i.getCurrentState()));

    const currentStates = new Set(allStates.map(state => (state.indeterminate ? 'indeterminate' : state.checked ? 'checked' : 'unchecked')));

    const isChecked = currentStates.has('checked') || currentStates.has('indeterminate');

    const isIndeterminate = currentStates.size > 1;

    const status = isIndeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked';

    return { status, isChecked, isIndeterminate };
  }

  syncCheckgroupParent() {
    if (this.syncInProgress || !this.isParent) {
      return;
    }

    this.syncInProgress = true;

    this.getCheckgroupState().then(({ isChecked, isIndeterminate }) => {
      this.setState(isChecked, isIndeterminate);
      this.syncInProgress = false;
    });
  }

  syncCheckgroupChilds() {
    if (this.syncInProgress || !this.isParent) {
      return;
    }

    this.syncInProgress = true;

    if (!this.currentIndeterminate) {
      const children = this.getCheckgroupChildren();

      for (const checkbox of children) {
        checkbox.setState(this.currentChecked, false);
      }
    }

    this.syncInProgress = false;
  }

  checkIsCheckboxParentChild(checkbox: HTMLElement) {
    const children: HTMLElement[] = this.getCheckgroupChildren();
    return children.includes(checkbox);
  }

  @Listen('brxChange', { target: 'window' })
  handleGlobalChange(event: CustomEvent<CheckboxChangeEventDetail>) {
    const target = event.target as HTMLElement | null;

    const checkbox = target?.closest('brx-checkbox');

    if (checkbox) {
      const isChildCheckbox = this.checkIsCheckboxParentChild(checkbox);

      if (isChildCheckbox) {
        this.syncCheckgroupParent();
      } else if (checkbox === this.el) {
        this.syncCheckgroupChilds();
      }
    }
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

    if (this.isParent) {
      this.syncCheckgroupParent();
    }
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
    if (this.parent) {
      if (this.currentChecked && !this.currentIndeterminate) {
        return this.uncheckAllLabel;
      } else {
        return this.checkAllLabel;
      }
    }

    return this.label;
  }

  render() {
    return (
      <Host
        role="checkbox"
        data-checked={this.currentChecked}
        aria-checked={`${this.currentChecked}`}
        data-indeterminate={this.currentIndeterminate}
        aria-hidden={this.disabled ? 'true' : null}
      >
        <input
          type="checkbox"
          id={this.inputId}
          disabled={this.disabled}
          checked={this.currentChecked}
          name={this.name ?? this.inputId}
          indeterminate={this.currentIndeterminate}
          aria-checked={`${this.currentChecked}`}
          onChange={this.onChange}
          onBlur={() => this.onBlur()}
          onFocus={() => this.onFocus()}
          ref={focusEl => (this.nativeInput = focusEl)}
        />

        <label htmlFor={this.inputId}>{this.labelText}</label>

        <slot></slot>
      </Host>
    );
  }
}
