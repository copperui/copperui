import { Component, Element, h, Host, Listen, Prop } from '@stencil/core';
import { tryParseJSON } from '../../utils/data';
import { IAccordionLegacyEntryDefinition } from '../../interfaces/IAccordionLegacyEntryDefinition';

@Component({
  tag: 'brx-accordion-legacy',
  styleUrl: 'brx-accordion-legacy.scss',
  shadow: false,
})
export class BrxAccordionLegacy {
  @Element()
  el: HTMLElement;

  @Prop({ reflect: true })
  single: boolean = false;

  @Prop({ reflect: true })
  negative: boolean = false;

  @Prop({ reflect: true, mutable: true, attribute: 'entries' })
  entries: any;

  get childEntryItems() {
    return Array.from(this.el.querySelectorAll('brx-accordion-legacy-entry-item'));
  }

  get parsedEntries(): IAccordionLegacyEntryDefinition[] {
    const incomingEntries = tryParseJSON(this.entries);

    if (Array.isArray(incomingEntries)) {
      return incomingEntries;
    }

    return [];
  }

  @Listen('collapseChange')
  handleCollapseChange(ev: CustomEvent<HTMLBrxAccordionLegacyEntryItemElement>) {
    const targetItem = ev.detail;

    const active = targetItem.active;

    if (active && this.single) {
      this.handleCollapseSingle(targetItem);
    }
  }

  handleCollapseSingle(targetItem: HTMLBrxAccordionLegacyEntryItemElement) {
    const remainingItems = this.childEntryItems.filter(i => i !== targetItem);

    for (const remainingItem of remainingItems) {
      remainingItem.active = false;
    }
  }

  render() {
    return (
      <Host>
        {this.parsedEntries.map(entry => (
          <brx-accordion-legacy-entry key={entry.id}>
            <div slot="title">{entry.title}</div>
            <div slot="content">{entry.content}</div>
          </brx-accordion-legacy-entry>
        ))}

        <slot></slot>
      </Host>
    );
  }
}
