// This file was based on the <ion-radio-group /> from the Ionic Framework (MIT)
// https://github.com/ionic-team/ionic-framework/blob/d13a14658df2723aff908a94181cb563cb1f5b43/core/src/components/radio-group/radio-group.tsx

import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Listen, Prop, State, Watch } from '@stencil/core';

import type { RadioGroupChangeEventDetail } from './brx-radio-group-interface';
import { findTarget, generateUniqueId } from '../../utils/helpers';
import { RadioChangeEventDetail } from '../brx-radio/brx-radio-interface';

@Component({
  tag: 'brx-radio-group',
  scoped: false,
})
export class BrxRadioGroup implements ComponentInterface {
  @Element()
  el!: HTMLElement;

  /**
   * Emitted when the value has changed.
   */
  @Event()
  brxChange!: EventEmitter<RadioGroupChangeEventDetail>;

  @State()
  labelId: string;

  @Prop({ reflect: true })
  label?: HTMLLabelElement | string | null;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop({ reflect: true })
  name: string;

  /**
   * the value of the radio group.
   */
  @Prop({ mutable: true })
  value?: any | null;

  /**
   * If `true`, the radios can be deselected.
   */
  @Prop({ reflect: true })
  allowEmptySelection = false;

  @Watch('label')
  async labelChanged() {
    const label = findTarget(this.label);

    if (!label.id) {
      label.id = generateUniqueId();
    }

    this.labelId = label.id;
  }

  @Watch('value')
  valueChanged(value: any | undefined, oldValue) {
    this.setRadioTabindex(value);
    this.brxChange.emit({ value });
  }

  componentWillLoad() {
    this.setRadioTabindex(this.value);
  }

  @Listen('brxChange')
  watchBrxChange(ev: CustomEvent<RadioChangeEventDetail | any>) {
    /**
     * The Radio Group component mandates that only one radio button
     * within the group can be selected at any given time. Since `ion-radio`
     * is a shadow DOM component, it cannot natively perform this behavior
     * using the `name` attribute.
     */

    const target = ev.target as HTMLElement | null;

    const selectedRadio = target?.closest('brx-radio');

    if (selectedRadio) {
      ev.preventDefault();

      const currentValue = this.value;
      const newValue = selectedRadio.value;

      if (newValue !== currentValue) {
        this.value = newValue;
      } else if (this.allowEmptySelection) {
        this.value = undefined;
      }
    }
  }

  @Listen('keydown', { target: 'document' })
  onKeydown(ev: any) {
    if (ev.target && !this.el.contains(ev.target)) {
      return;
    }

    // Get all radios inside of the radio group and then
    // filter out disabled radios since we need to skip those
    const radios = this.getRadios().filter(radio => !radio.disabled);

    // Only move the radio if the current focus is in the radio group
    if (ev.target && radios.includes(ev.target)) {
      const index = radios.findIndex(radio => radio === ev.target);
      const current = radios[index];

      let next;

      // If hitting arrow down or arrow right, move to the next radio
      // If we're on the last radio, move to the first radio
      if (['ArrowDown', 'ArrowRight'].includes(ev.code)) {
        next = index === radios.length - 1 ? radios[0] : radios[index + 1];
      }

      // If hitting arrow up or arrow left, move to the previous radio
      // If we're on the first radio, move to the last radio
      if (['ArrowUp', 'ArrowLeft'].includes(ev.code)) {
        next = index === 0 ? radios[radios.length - 1] : radios[index - 1];
      }

      if (next && radios.includes(next)) {
        next.setFocus(ev);
      }

      // Update the radio group value when a user presses the
      // space bar on top of a selected radio
      if (['Space'].includes(ev.code)) {
        this.value = this.allowEmptySelection && this.value !== undefined ? undefined : current.value;

        // Prevent browsers from jumping
        // to the bottom of the screen
        ev.preventDefault();
      }
    }
  }

  render() {
    const { label, labelId } = this;

    return (
      <Host role="radiogroup" aria-labelledby={label ? labelId : null}>
        <slot />
      </Host>
    );
  }

  private setRadioTabindex = (value: any | undefined) => {
    const radios = this.getRadios();

    // Get the first radio that is not disabled and the checked one
    const first = radios.find(radio => !radio.disabled);
    const checked = radios.find(radio => radio.value === value && !radio.disabled);

    if (!first && !checked) {
      return;
    }

    // If an enabled checked radio exists, set it to be the focusable radio
    // otherwise we default to focus the first radio
    const focusable = checked || first;

    for (const radio of radios) {
      const tabindex = radio === focusable ? 0 : -1;
      radio.setButtonTabindex(tabindex);
    }
  };

  private getRadios(): HTMLBrxRadioElement[] {
    return Array.from(this.el.querySelectorAll('ion-radio'));
  }
}
