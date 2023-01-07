import { newSpecPage } from '@stencil/core/testing';
import { BrxAccordionLegacyEntry } from '../brx-accordion-legacy-entry';

describe('brx-accordion-legacy-entry', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxAccordionLegacyEntry],
      html: `<brx-accordion-legacy-entry></brx-accordion-legacy-entry>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-accordion-legacy-entry>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-accordion-legacy-entry>
    `);
  });
});
