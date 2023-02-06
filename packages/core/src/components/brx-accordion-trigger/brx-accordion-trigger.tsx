import { Component, ComponentInterface, Element, h, Host, Method, Prop } from '@stencil/core';
import { findTargets } from '../../utils/helpers';
import { getCollapseTriggerProps, IBrxCollapseTriggerState } from '../brx-collapse-trigger/brx-collapse-trigger-interface';

@Component({
  tag: 'brx-accordion-trigger',
  styleUrl: 'brx-accordion-trigger.scss',
  shadow: false,
})
export class BrxAccordionTrigger implements ComponentInterface, IBrxCollapseTriggerState {
  private collapseTriggerEl: HTMLBrxCollapseTriggerElement;

  @Element()
  el: HTMLBrxAccordionTriggerElement;

  // brx-collapse-trigger props
  @Prop()
  useIcons: boolean = true;

  @Prop()
  breakpoint: string | undefined;

  @Prop()
  iconToHide: string = 'fa5/fas/chevron-up';

  @Prop()
  iconToShow: string = 'fa5/fas/chevron-down';

  @Prop({ reflect: true, attribute: 'target' })
  target: HTMLElement | string;
  // end brx-collapse-trigger props

  @Prop({ reflect: true })
  group: string;

  getGroupAccordionTriggers() {
    return findTargets<HTMLBrxAccordionTriggerElement>(`brx-accordion-trigger[group="${this.group}"]`);
  }

  getOtherGroupAccordionTriggers() {
    const groupAccordions = this.getGroupAccordionTriggers();
    return groupAccordions.filter(i => i !== this.el);
  }

  async closeOtherAccordionTriggers() {
    const otherAccordions = this.getOtherGroupAccordionTriggers();

    for (const accordion of otherAccordions) {
      await accordion.close();
    }
  }

  async handleClick() {
    const isOpen = await this.collapseTriggerEl.getIsOpen();

    if (isOpen) {
      await this.closeOtherAccordionTriggers();
    }
  }

  @Method()
  async close() {
    await this.collapseTriggerEl.close(false);
  }

  get collapseTriggerProps() {
    return getCollapseTriggerProps(this);
  }

  render() {
    return (
      <Host>
        <brx-collapse-trigger {...this.collapseTriggerProps} onBrxTriggerClick={() => this.handleClick()} ref={el => void (this.collapseTriggerEl = el)}>
          <slot></slot>
        </brx-collapse-trigger>
      </Host>
    );
  }
}
