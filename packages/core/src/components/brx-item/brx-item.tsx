import { Component, Host, h, Prop, Listen, Element, ComponentInterface } from '@stencil/core';
import { getWindow, requestIdleCallbackPony } from '../../utils/environment';

@Component({
  tag: 'brx-item',
  styleUrl: 'brx-item.scss',
  shadow: false,
})
export class BrxItem implements ComponentInterface {
  @Element()
  el!: HTMLElement;

  @Prop({ reflect: true })
  passthrough: boolean;

  @Prop({ reflect: true })
  disabled: boolean;

  @Prop({ reflect: true, mutable: true })
  selected: boolean;

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

      requestIdleCallbackPony(
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
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
