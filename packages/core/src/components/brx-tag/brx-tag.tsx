import { Component, Host, h, Prop, Listen, Element, ComponentInterface } from '@stencil/core';
import { enqueueIdleCallback, findTarget } from '../../utils/helpers';

@Component({
  tag: 'brx-tag',
  styleUrl: 'brx-tag.scss',
  shadow: false,
})
export class BrxTag implements ComponentInterface {
  @Element()
  el: HTMLElement;

  @Prop({ reflect: true, mutable: true })
  selected: boolean;

  @Prop({ reflect: true })
  interaction: boolean;

  @Prop({ reflect: true })
  interactionSelect: boolean;

  get inputElement() {
    return this.el.querySelector('input');
  }

  get inputCheckedState() {
    return this.inputElement?.checked;
  }

  @Listen('click', { passive: true })
  handleInnerClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const dismissEl = target.closest<HTMLElement>('[data-dismiss]');

    if (dismissEl) {
      const dismiss = dismissEl.dataset.dismiss;
      const target = dismiss.length > 0 ? findTarget(dismiss) : this.el;

      if (target) {
        target.remove();
      }
    }
  }

  @Listen('change', { target: 'document', passive: true })
  handleChange() {
    enqueueIdleCallback(() => {
      this.syncSelected();
    });
  }

  syncSelected() {
    if (this.interactionSelect) {
      this.selected = this.inputCheckedState;
    }
  }

  componentWillLoad() {
    this.syncSelected();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
