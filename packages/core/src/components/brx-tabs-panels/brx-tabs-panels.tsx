import { Component, Host, h, Prop, Element, Listen, State, Watch, ComponentInterface } from '@stencil/core';
import { findTargets } from '../../utils/helpers';
import { TabChangeEventDetail } from '../brx-tabs/brx-tabs-interface';

@Component({
  tag: 'brx-tabs-panels',
  styleUrl: 'brx-tabs-panels.scss',
  shadow: false,
})
export class BrxTabsPanels implements ComponentInterface {
  @Element()
  el: HTMLElement;

  @Prop({ reflect: true })
  name: string;

  @Prop({ reflect: true })
  darkMode: boolean = false;

  @State()
  currentValue: string | undefined;

  getPanels() {
    return Array.from(this.el.querySelectorAll('brx-tabs-panel'));
  }

  getTabsManagers() {
    return findTargets<HTMLBrxTabsElement>(`brx-tabs[name="${this.name}"]`);
  }

  getInitialValue() {
    const mainTabsManager = this.getTabsManagers()[0];
    return mainTabsManager?.getCurrentValue();
  }

  openPanel(value: string | undefined) {
    const panels = this.getPanels();

    for (const panel of panels) {
      panel.active = panel.value === value;
    }
  }

  syncPanels() {
    this.openPanel(this.currentValue);
  }

  @Watch('currentValue')
  handleCurrentValueChange() {
    this.syncPanels();
  }

  @Listen('brxTabChange', { target: 'window', passive: true })
  handleGlobalTabChange(event: CustomEvent<TabChangeEventDetail>) {
    const target = event.target as HTMLElement;

    const tabs = target.closest('brx-tabs');

    if (tabs && tabs.name === this.name) {
      const { value } = event.detail;
      this.currentValue = value;
    }
  }

  async componentWillLoad() {
    this.currentValue = await this.getInitialValue();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
