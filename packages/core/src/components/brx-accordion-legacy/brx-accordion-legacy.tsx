import { Component, Element, h, Host, Listen, Prop } from '@stencil/core';
import { IAccordionLegacyEntryDefinition } from '../../interfaces/IAccordionLegacyEntryDefinition';
import { findTargets, tryParseJSON } from '../../utils/helpers';

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

  @Prop({ reflect: false, attribute: 'entries' })
  entries: any | undefined;

  get childEntryItems() {
    return findTargets<HTMLBrxAccordionLegacyEntryItemElement>('brx-accordion-legacy-entry-item', this.el);
  }

  get parsedEntries(): IAccordionLegacyEntryDefinition[] {
    const incomingEntries = tryParseJSON(this.entries);

    if (Array.isArray(incomingEntries)) {
      return incomingEntries;
    }

    return [];
  }

  @Listen('collapseChange')
  handleCollapseChange(event: CustomEvent<HTMLBrxAccordionLegacyEntryItemElement>) {
    const detail = event.detail;
    const { active } = detail;

    if (this.single && active) {
      this.handleCollapseSingle(detail);
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
