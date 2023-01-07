import { newSpecPage } from '@stencil/core/testing';
import { BrxAccordionLegacyEntryContent } from '../brx-accordion-legacy-entry-content';

describe('brx-accordion-legacy-entry-content', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxAccordionLegacyEntryContent],
      html: `<brx-accordion-legacy-entry-content></brx-accordion-legacy-entry-content>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-accordion-legacy-entry-content>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-accordion-legacy-entry-content>
    `);
  });
});
