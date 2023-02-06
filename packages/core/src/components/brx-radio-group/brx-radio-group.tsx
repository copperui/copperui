// This file was based on the <ion-radio-group /> from the Ionic Framework (MIT)
// https://github.com/ionic-team/ionic-framework/blob/d13a14658df2723aff908a94181cb563cb1f5b43/core/src/components/radio-group/radio-group.tsx

import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { TOKEN_UNCONTROLLED } from '../../tokens';

import { findTarget, findTargets, generateUniqueId } from '../../utils/helpers';
import { RadioChangeEventDetail } from '../brx-radio/brx-radio-interface';
import type { RadioGroupChangeEventDetail, RadioGroupUpdateEventDetail } from './brx-radio-group-interface';

@Component({
  tag: 'brx-radio-group',
  scoped: false,
})
export class BrxRadioGroup implements ComponentInterface {
  @Element()
  el!: HTMLElement;

  @Event()
  brxRadioGroupChange: EventEmitter<RadioGroupChangeEventDetail>;

  @Event()
  brxRadioGroupUpdate: EventEmitter<RadioGroupUpdateEventDetail>;

  get radioElements(): HTMLBrxRadioElement[] {
    return findTargets<HTMLBrxRadioElement>('brx-radio', this.el);
  }

  @Prop({ mutable: true })
  labelId: string;

  @Prop({ reflect: true })
  label?: HTMLLabelElement | string | null;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop({ reflect: true })
  name: string;

  @Prop()
  value: any | undefined | null;

  @Prop()
  controlledValue: any | undefined | null | TOKEN_UNCONTROLLED = TOKEN_UNCONTROLLED;

  @State()
  currentValue: any | null;

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

    this.brxRadioGroupChange.emit({ value });
  }

  @Watch('currentValue')
  handleCurrentValueChange() {
    this.brxRadioGroupUpdate.emit({ value: this.currentValue });
  }

  @Method()
  getCurrentValue() {
    return Promise.resolve(this.currentValue);
  }

  /**
   * If `true`, the radios can be deselected.
   */
  @Prop({ reflect: true })
  allowEmptySelection = false;

  @Listen('brxChange')
  handleRadioBrxChange(event: CustomEvent<unknown>) {
    const target = event.target as HTMLElement | null;

    const brxRadio = target?.closest('brx-radio');

    if (brxRadio) {
      const { checked } = event.detail as RadioChangeEventDetail;

      if (checked) {
        event.preventDefault();

        const currentValue = this.currentValue;
        const newValue = brxRadio.value;

        if (newValue !== currentValue) {
          this.setValue(newValue);
        } else if (this.allowEmptySelection) {
          this.setValue(undefined);
        }
      }
    }
  }

  connectedCallback() {
    const label = findTarget(this.label);

    if (label) {
      if (!label.id) {
        label.id = this.labelId ?? generateUniqueId();
      }

      this.labelId = label.id;
    }

    this.syncCurrentValueFromProps();
  }

  render() {
    const { label, labelId } = this;

    return (
      <Host role="radiogroup" aria-labelledby={label ? labelId : null}>
        <slot />
      </Host>
    );
  }
}
