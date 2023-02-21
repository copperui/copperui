import { Component, ComponentInterface, Element, h, Host, Listen, Prop } from '@stencil/core';

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

  syncInProgress: boolean = false;

  async getBrxInput() {
    return this.el.querySelector<HTMLBrxRadioElement | HTMLBrxCheckboxElement>('brx-radio, brx-checkbox') ?? null;
  }

  async syncSelectedState() {
    const brxInput = await this.getBrxInput();

    if (brxInput) {
      const { checked } = await brxInput.getCurrentState();
      this.selected = checked;
    }
  }

  @Listen('brxUpdate')
  watchChange() {
    if (!this.syncInProgress) {
      this.syncInProgress = true;

      this.syncSelectedState().then(() => {
        this.syncInProgress = false;
      });
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
