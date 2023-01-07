import { newSpecPage } from '@stencil/core/testing';
import { BrxAccordionLegacy } from '../brx-accordion-legacy';

describe('brx-accordion-legacy', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxAccordionLegacy],
      html: `<brx-accordion-legacy></brx-accordion-legacy>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-accordion-legacy>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-accordion-legacy>
    `);
  });
});
