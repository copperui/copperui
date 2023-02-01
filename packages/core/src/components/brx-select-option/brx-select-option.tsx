import { Component, Host, h, Prop, ComponentInterface, Event, EventEmitter, Listen, Element, Method } from '@stencil/core';
import { check } from 'prettier';
import { ClickOptions } from 'puppeteer';
import { generateUniqueId } from '../../utils/helpers';
import { CheckboxChangeEventDetail } from '../brx-checkbox/brx-checkbox-interface';
import { RadioChangeEventDetail } from '../brx-radio/brx-radio-interface';
import { SelectOptionChangeEventDetail } from './brx-select-option-interface';

@Component({
  tag: 'brx-select-option',
  styleUrl: 'brx-select-option.scss',
  shadow: false,
})
export class BrxSelectOption implements ComponentInterface {
  @Element()
  el: HTMLBrxSelectOptionElement;

  @Event()
  brxSelectOptionChange: EventEmitter<SelectOptionChangeEventDetail>;

  @Prop()
  label: string;

  @Prop({ mutable: true })
  inputId: string;

  @Prop()
  multiple = false;

  @Prop({ reflect: true })
  highlighted: boolean = false;

  @Prop()
  value: string;

  @Prop()
  checked = false;

  @Prop()
  visible = true;

  changeChecked(checked: boolean) {
    const { value } = this;

    if (checked !== this.checked) {
      this.brxSelectOptionChange.emit({ value, checked });
    }
  }

  @Method()
  toggleChecked() {
    this.changeChecked(!this.checked);
    return Promise.resolve();
  }

  componentWillLoad() {
    if (!this.inputId) {
      this.inputId = generateUniqueId();
    }
  }

  @Listen('brxChange')
  handleBrxChange(event: CustomEvent<unknown>) {
    const target = event.target as HTMLElement;

    const trigger = target.closest('brx-select, brx-radio');

    if (trigger) {
      const detail = event.detail as CheckboxChangeEventDetail | RadioChangeEventDetail;
      this.changeChecked(detail.checked);
    }
  }

  @Listen('click')
  handleClick(event: Event) {
    const target = event.target as HTMLElement;

    if (target === this.el) {
      this.toggleChecked();
    }
  }

  get brxInputAttributes() {
    const { label, inputId, checked, value } = this;

    return {
      label,
      value,
      inputId,
      controlledChecked: checked,
    };
  }

  render() {
    const { visible, brxInputAttributes } = this;

    return (
      <Host class={!visible ? 'd-none' : ''}>
        <brx-item tabindex="-1" data-toggle="selection">
          {this.multiple ? <brx-checkbox {...brxInputAttributes} /> : <brx-radio {...brxInputAttributes} />}
          <slot></slot>
        </brx-item>
      </Host>
    );
  }
}
