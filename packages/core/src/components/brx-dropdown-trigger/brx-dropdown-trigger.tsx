import { Component, ComponentInterface, Element, h, Host, Listen, Prop, State } from '@stencil/core';
import { enqueueIdleCallback } from '../../utils/helpers';
import { getCollapseTriggerProps, IBrxCollapseTriggerState } from '../brx-collapse-trigger/brx-collapse-trigger-interface';

@Component({
  tag: 'brx-dropdown-trigger',
  styleUrl: 'brx-dropdown-trigger.scss',
  shadow: false,
})
export class BrxDropdownTrigger implements ComponentInterface, IBrxCollapseTriggerState {
  @Element()
  el: HTMLElement;

  @Prop()
  keepTargetVisibleWhenHidden: boolean = false;

  private get isTriggerVisible() {
    return this.el.offsetParent !== null;
  }

  // brx-collapse-trigger props

  @Prop({ reflect: true })
  useIcons: boolean = true;

  @Prop({ reflect: true })
  breakpoint: string | undefined;

  @Prop({ reflect: true })
  iconToHide: string = 'fa5/fas/chevron-up';

  @Prop({ reflect: true })
  iconToShow: string = 'fa5/fas/chevron-down';

  @Prop({ reflect: true })
  target: HTMLElement | string;
  // end brx-collapse-trigger props

  @State()
  dropdown: boolean;

  private collapseTriggerEl: HTMLBrxCollapseTriggerElement;

  @Listen('mousedown', { target: 'document', passive: true })
  async handleDropdown(event: MouseEvent) {
    const evTargetEl = event.target as HTMLElement;

    if (this.collapseTriggerEl) {
      const collapseTargetEl = await this.collapseTriggerEl.getTarget();
      const collapseTriggerEl = await this.collapseTriggerEl.getTrigger();

      const isTargetHidden = collapseTargetEl.hasAttribute('hidden');

      if (!this.isTriggerVisible && this.keepTargetVisibleWhenHidden) {
        if (isTargetHidden) {
          collapseTriggerEl.click();
        }
      } else {
        if (!collapseTriggerEl.contains(evTargetEl) && !isTargetHidden && !collapseTargetEl.contains(evTargetEl)) {
          collapseTriggerEl.click();
        }
      }
    }
  }

  private async syncDynamicActiveState() {
    const collapseTriggerEl = await this.collapseTriggerEl?.getTrigger();
    const collapseTargetEl = await this.collapseTriggerEl?.getTarget();

    if (collapseTargetEl && collapseTriggerEl) {
      const isTargetHidden = collapseTargetEl.hasAttribute('hidden');

      if (this.keepTargetVisibleWhenHidden) {
        if (!this.isTriggerVisible) {
          if (isTargetHidden) {
            collapseTriggerEl.click();
          }
        } else {
          if (!isTargetHidden) {
            collapseTriggerEl.click();
          }
        }
      }
    }
  }

  @Listen('resize', { target: 'window', passive: true })
  async handleWindowResize() {
    this.syncDynamicActiveState();
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

  componentDidLoad(): void {
    enqueueIdleCallback(() => {
      this.syncDynamicActiveState();
    });
  }

  render() {
    const collapseTriggerProps = getCollapseTriggerProps(this);

    return (
      <Host>
        <brx-collapse-trigger
          {...collapseTriggerProps}
          ref={el => void (this.collapseTriggerEl = el)}
          onBrxTriggerClick={() => this.handleTriggerClickBehavior()}
          onBrxSetTargetVisibilityStatus={() => this.setTargetVisibilityStatus()}
        >
          <slot></slot>
        </brx-collapse-trigger>
      </Host>
    );
  }
}
