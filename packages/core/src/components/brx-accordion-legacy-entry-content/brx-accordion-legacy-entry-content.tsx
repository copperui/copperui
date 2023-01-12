import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'brx-accordion-legacy-entry-content',
  styleUrl: 'brx-accordion-legacy-entry-content.scss',
  shadow: false,
})
export class BrxAccordionLegacyEntryContent {
  @Prop({ reflect: true })
  entryId: string | undefined;

  render() {
    return (
      <Host {...(this.entryId ? { id: this.entryId } : {})}>
        <slot></slot>
      </Host>
    );
  }
}
