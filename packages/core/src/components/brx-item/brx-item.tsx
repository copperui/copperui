import { Component, ComponentInterface, Element, h, Host, Listen, Prop } from '@stencil/core';
import { enqueueIdleCallback } from '../../utils/helpers';

@Component({
  tag: 'brx-item',
  styleUrl: 'brx-item.scss',
  shadow: false,
})
export class BrxItem implements ComponentInterface {
  @Element()
  el!: HTMLElement;

  @Prop({ reflect: true })
  button: boolean;

  @Prop({ reflect: true })
  disabled: boolean;

  @Prop({ reflect: true, mutable: true })
  selected: boolean;

  @Prop({ reflect: true })
  passStyles: boolean;

  syncInProgress: boolean = false;

  findInputItem(): HTMLBrxRadioElement | HTMLBrxCheckboxElement | null {
    return this.el.querySelector('brx-radio, brx-checkbox') ?? null;
  }

  async findInputItemChecked() {
    const inputItem = this.findInputItem();
    return inputItem?.getNativeChecked();
  }

  async syncSelectedState() {
    this.selected = await this.findInputItemChecked();
    this.syncInProgress = false;
  }

  @Listen('brxChange', { target: 'window', passive: true })
  watchChange() {
    if (!this.syncInProgress) {
      this.syncInProgress = true;

      enqueueIdleCallback(
        () => {
          this.syncSelectedState();
        },
        { timeout: 100 },
      );
    }
  }

  componentDidLoad() {
    this.syncSelectedState();
  }

  render() {
    return (
      <Host role="listitem">
        <slot></slot>
      </Host>
    );
  }
}
