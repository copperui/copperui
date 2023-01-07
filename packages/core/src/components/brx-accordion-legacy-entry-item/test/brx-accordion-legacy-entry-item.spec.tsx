import { newSpecPage } from '@stencil/core/testing';
import { BrxAccordionLegacyEntryItem } from '../brx-accordion-legacy-entry-item';

describe('brx-accordion-legacy-entry-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxAccordionLegacyEntryItem],
      html: `<brx-accordion-legacy-entry-item></brx-accordion-legacy-entry-item>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-accordion-legacy-entry-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-accordion-legacy-entry-item>
    `);
  });
});
