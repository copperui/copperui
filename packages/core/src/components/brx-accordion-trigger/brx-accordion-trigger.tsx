import { Component, ComponentInterface, Element, h, Host, Method, Prop } from '@stencil/core';
import { findTargets } from '../../utils/helpers';
import { getCollapseTriggerProps, IBrxCollapseTriggerState } from '../brx-collapse-trigger/brx-collapse-trigger-interface';

@Component({
  tag: 'brx-accordion-trigger',
  styleUrl: 'brx-accordion-trigger.scss',
  shadow: false,
})
export class BrxAccordionTrigger implements ComponentInterface, IBrxCollapseTriggerState {
  @Element()
  el: HTMLBrxAccordionTriggerElement;

  // brx-collapse-trigger props
  @Prop({ reflect: true })
  useIcons: boolean = true;

  @Prop({ reflect: true })
  breakpoint: string | undefined;

  @Prop({ reflect: true })
  iconToHide: string = 'fa5/fas/chevron-up';

  @Prop({ reflect: true })
  iconToShow: string = 'fa5/fas/chevron-down';

  @Prop({ reflect: true, attribute: 'target' })
  target: HTMLElement | string;
  // end brx-collapse-trigger props

  @Prop({ reflect: true })
  group: string;

  private collapseTriggerEl: HTMLBrxCollapseTriggerElement;

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

  render() {
    const collapseTriggerProps = getCollapseTriggerProps(this);

    return (
      <Host>
        <brx-collapse-trigger {...collapseTriggerProps} onBrxTriggerClick={() => this.handleClick()} ref={el => void (this.collapseTriggerEl = el)}>
          <slot></slot>
        </brx-collapse-trigger>
      </Host>
    );
  }
}
