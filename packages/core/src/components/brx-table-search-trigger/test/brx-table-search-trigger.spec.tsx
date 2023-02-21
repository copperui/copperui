import { newSpecPage } from '@stencil/core/testing';
import { BrxTableSearchTrigger } from '../brx-table-search-trigger';

describe('brx-table-search-trigger', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTableSearchTrigger],
      html: `<brx-table-search-trigger></brx-table-search-trigger>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-table-search-trigger>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-table-search-trigger>
    `);
  });
});
