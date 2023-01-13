import { newSpecPage } from '@stencil/core/testing';
import { BrxAccordionTrigger } from '../brx-accordion-trigger';

describe('brx-accordion-trigger', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxAccordionTrigger],
      html: `<brx-accordion-trigger></brx-accordion-trigger>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-accordion-trigger>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-accordion-trigger>
    `);
  });
});
