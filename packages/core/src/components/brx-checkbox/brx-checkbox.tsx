// This file was based on the <ion-checkbox /> from the Ionic Framework (MIT)
// https://github.com/ionic-team/ionic-framework/blob/d13a14658df2723aff908a94181cb563cb1f5b43/core/src/components/checkbox/checkbox.tsx

import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, Watch } from '@stencil/core';
import { CheckboxChangeEventDetail } from './brx-checkbox-interface';
import { generateUniqueId, getWindow } from '../../utils/helpers';

@Component({
  tag: 'brx-checkbox',
  styleUrl: 'brx-checkbox.scss',
  shadow: false,
})
export class BrxCheckbox implements ComponentInterface {
  @Element() el!: HTMLElement;
  /**
   * Emitted when the checked property has changed.
   */
  @Event()
  brxChange!: EventEmitter<CheckboxChangeEventDetail>;
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
  @Prop({ reflect: true, mutable: true })
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

  @Prop({ reflect: true })
  danger: boolean | undefined;

  @Prop({ reflect: true })
  size: 'small' | 'medium' = 'medium';

  @Prop({ reflect: true })
  state: 'invalid' | 'danger' | undefined = undefined;

  @Prop({ reflect: true })
  darkMode = false;

  @Prop({ reflect: true })
  hiddenLabel = false;

  @Prop({ reflect: true, mutable: true })
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
  _parent: string | boolean | undefined;

  @Prop({ reflect: true })
  checkAllLabel: string = 'Selecionar tudo';

  @Prop({ reflect: true })
  uncheckAllLabel: string = 'Desselecionar tudo';

  private nativeInput?: HTMLInputElement;

  get parent() {
    const { _parent } = this;

    return _parent === '' ? true : _parent;
  }

  get isParent() {
    return this.parent !== false && this.parent !== undefined;
  }

  getCheckgroupChildren(): HTMLBrxCheckboxElement[] {
    const { el, parent } = this;

    if (parent) {
      const win = getWindow();
      const documentChildren = typeof parent === 'string' && win ? Array.from<HTMLBrxCheckboxElement>(win.document.querySelectorAll(`brx-checkbox[child="${parent}"]`)) : [];

      const parentGroup = el.closest('brx-checkgroup');
      const parentGroupAllCheckboxes = Array.from(parentGroup?.querySelectorAll('brx-checkbox') ?? []);

      const observableCheckboxes = parentGroupAllCheckboxes
        .filter(checkbox => checkbox !== el)
        .filter(checkbox => {
          const groupLevel1 = checkbox.closest('brx-checkgroup');
          const groupLevel2 = groupLevel1.parentElement.closest('brx-checkgroup');
          return groupLevel1 === parentGroup || groupLevel2 === parentGroup;
        });

      return [...documentChildren, ...observableCheckboxes];
    }

    return [];
  }

  getCheckgroupState() {
    const children = this.getCheckgroupChildren();
    const childrenStates = new Set(children.map(checkbox => (checkbox.indeterminate ? 'indeterminate' : checkbox.checked ? 'checked' : 'unchecked')));

    const isChecked = childrenStates.has('checked') || childrenStates.has('indeterminate');
    const isIndeterminate = childrenStates.size > 1;

    const status = isIndeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked';

    return { status, isChecked, isIndeterminate };
  }

  private syncInProgress = false;

  syncCheckgroupParentStateFromChildren() {
    if (this.syncInProgress) {
      return;
    }

    this.syncInProgress = true;

    const { isChecked, isIndeterminate } = this.getCheckgroupState();

    this.indeterminate = isIndeterminate;
    this.checked = isChecked;

    this.syncInProgress = false;
  }

  syncCheckgroupChildStateFromParent() {
    if (this.syncInProgress) {
      return;
    }

    this.syncInProgress = true;

    if (!this.indeterminate) {
      const children = this.getCheckgroupChildren();

      for (const checkbox of children) {
        checkbox.indeterminate = false;
        checkbox.checked = this.checked;
      }
    }

    this.syncInProgress = false;
  }

  checkIsCheckboxChild(checkbox: HTMLElement) {
    const children: HTMLElement[] = this.getCheckgroupChildren();
    return children.includes(checkbox);
  }

  @Listen('brxChange', { target: 'window' })
  handleGlobalChange(event: CustomEvent<CheckboxChangeEventDetail>) {
    if (!this.parent) {
      return;
    }

    const target = event.target as HTMLElement | null;

    const checkbox = target?.closest('brx-checkbox');

    if (checkbox) {
      const isChildCheckbox = this.checkIsCheckboxChild(checkbox);

      if (isChildCheckbox) {
        this.syncCheckgroupParentStateFromChildren();
      } else if (checkbox === this.el) {
        this.syncCheckgroupChildStateFromParent();
      }
    }
  }

  @Watch('checked')
  checkedStateChanged(isChecked: boolean) {
    this.brxChange.emit({
      checked: isChecked,
      value: this.value,
    });
  }

  @Method()
  async getNativeChecked() {
    return this.nativeInput?.checked;
  }

  async componentWillLoad() {
    if (this.inputId === undefined) {
      this.inputId = await generateUniqueId();
    }

    this.syncCheckgroupParentStateFromChildren();
  }

  private setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }

  private onChange = (ev: any) => {
    ev.preventDefault();
    this.setFocus();
    this.indeterminate = false;
    this.checked = !this.checked;
  };

  private onFocus = () => {
    this.brxFocus.emit();
  };

  private onBlur = () => {
    this.brxBlur.emit();
  };

  render() {
    const { name, checked, disabled, inputId, indeterminate } = this;

    const label = this.parent ? (this.checked && !this.indeterminate ? this.uncheckAllLabel : this.checkAllLabel) : this.label;

    return (
      <Host aria-checked={`${checked}`} aria-hidden={disabled ? 'true' : null} role="checkbox">
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          name={name ?? inputId}
          aria-checked={`${checked}`}
          indeterminate={indeterminate}
          onChange={this.onChange}
          onBlur={() => this.onBlur()}
          onFocus={() => this.onFocus()}
          ref={focusEl => (this.nativeInput = focusEl)}
        />

        <label htmlFor={inputId}>{label}</label>

        <slot></slot>
      </Host>
    );
  }
}
