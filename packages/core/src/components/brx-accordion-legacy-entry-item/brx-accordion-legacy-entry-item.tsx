import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, Watch } from '@stencil/core';
import { Attributes, inheritAriaAttributes } from '../../utils/inherited-attributes';

@Component({
  tag: 'brx-accordion-legacy-entry-item',
  styleUrl: 'brx-accordion-legacy-entry-item.scss',
  shadow: false,
})
export class BrxAccordionLegacyEntryItem {
  @Element()
  el: HTMLBrxAccordionLegacyEntryItemElement;
  @Prop({ reflect: true, mutable: true })
  active: boolean = false;
  @Prop({ reflect: true })
  entryId: string | undefined;
  @Event({ eventName: 'collapseChange' })
  collapseChangeEmitter: EventEmitter<HTMLBrxAccordionLegacyEntryItemElement>;
  private inheritedAttributes: Attributes = {};

  @Watch('active')
  handleChange() {
    this.collapseChangeEmitter.emit(this.el);
  }

  @Listen('click', {})
  handleClick() {
    this.active = !this.active;
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAriaAttributes(this.el);
  }

  render() {
    const iconName = this.active ? 'angle-up' : 'angle-down';

    const attrs = {
      ...(this.entryId ? { ['aria-controls']: this.entryId } : {}),
    };

    return (
      <Host>
        <button class="header" type="button" {...attrs} {...this.inheritedAttributes}>
          <span class="icon">
            <brx-icon name={iconName}></brx-icon>
          </span>
          <div class="title">
            <slot></slot>
          </div>
        </button>
      </Host>
    );
  }
}
