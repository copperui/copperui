import { Component, Host, h, Listen, ComponentInterface, Prop, State } from '@stencil/core';
import { BrxCollapseTrigger } from '../brx-collapse-trigger/brx-collapse-trigger';
import { IBrxCollapseTriggerProps } from '../brx-collapse-trigger/brx-collapse-trigger-interface';

@Component({
  tag: 'brx-dropdown-trigger',
  styleUrl: 'brx-dropdown-trigger.scss',
  shadow: false,
})
export class BrxDropdownTrigger implements ComponentInterface, IBrxCollapseTriggerProps {
  private collapseTriggerEl: HTMLBrxCollapseTriggerElement;

  @Prop({ reflect: true })
  useIcons: boolean = true;

  @Prop({ reflect: true })
  breakpoint: string | undefined;

  @Prop({ reflect: true })
  iconToHide: string = 'fa5/fas/chevron-up';

  @Prop({ reflect: true })
  iconToShow: string = 'fa5/fas/chevron-down';

  @Prop({ reflect: true, attribute: 'target' })
  propTarget: HTMLElement | string;

  @State()
  dropdown: boolean;

  @Listen('mousedown', { target: 'document', passive: true })
  async handleDropdown(event: MouseEvent) {
    const evTargetEl = event.target as HTMLElement;

    if (this.collapseTriggerEl) {
      const collapseTargetEl = await this.collapseTriggerEl.getTarget();
      const collapseTriggerEl = await this.collapseTriggerEl.getTrigger();

      if (!collapseTriggerEl.contains(evTargetEl) && !collapseTargetEl.hasAttribute('hidden') && !collapseTargetEl.contains(evTargetEl)) {
        collapseTriggerEl.click();
      }
    }
  }

  async setTargetVisibilityStatus() {
    const target = await this.collapseTriggerEl.getTarget();

    if (target.hasAttribute('hidden')) {
      target.removeAttribute('data-dropdown');
    } else {
      target.setAttribute('data-dropdown', '');
    }
  }

  async setParentsTargetVisibilityStatus() {
    const target = await this.collapseTriggerEl.getTarget();
    this.dropdown = !target.hasAttribute('hidden');
  }

  handleTriggerClickBehavior() {
    this.setParentsTargetVisibilityStatus();
  }

  getCollapseTriggerProps() {
    const { useIcons, breakpoint, iconToHide, iconToShow, propTarget } = this;
    return { useIcons, breakpoint, iconToHide, iconToShow, target: propTarget };
  }

  render() {
    const collapseTriggerProps = this.getCollapseTriggerProps();

    return (
      <Host>
        <brx-collapse-trigger
          {...collapseTriggerProps}
          ref={el => void (this.collapseTriggerEl = el)}
          onBrxSetTargetVisibilityStatus={() => this.setTargetVisibilityStatus()}
          onBrxTriggerClick={() => this.handleTriggerClickBehavior()}
        >
          <slot></slot>
        </brx-collapse-trigger>
      </Host>
    );
  }
}