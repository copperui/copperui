import { Component, Host, h, Prop } from '@stencil/core';
import { generateUniqueId } from '../../utils/entropy';

@Component({
  tag: 'brx-accordion-legacy-entry',
  styleUrl: 'brx-accordion-legacy-entry.scss',
  shadow: false,
})
export class BrxAccordionLegacyEntry {
  @Prop({ reflect: true })
  content: string | undefined;

  @Prop({ reflect: true, mutable: true })
  entryId: string | undefined;

  @Prop({ reflect: true })
  headerTitle: string | undefined;

  async componentWillLoad() {
    if (this.entryId === undefined) {
      this.entryId = await generateUniqueId();
    }
  }

  render() {
    return (
      <Host>
        <brx-accordion-legacy-entry-item entryId={this.entryId}>
          <slot name="title">{this.headerTitle}</slot>
        </brx-accordion-legacy-entry-item>
        <brx-accordion-legacy-entry-content entryId={this.entryId}>
          <slot name="content">{this.content}</slot>
        </brx-accordion-legacy-entry-content>
      </Host>
    );
  }
}
