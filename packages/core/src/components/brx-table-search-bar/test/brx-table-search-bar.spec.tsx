import { newSpecPage } from '@stencil/core/testing';
import { BrxTableSearchBar } from '../brx-table-search-bar';

describe('brx-table-search-bar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTableSearchBar],
      html: `<brx-table-search-bar></brx-table-search-bar>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-table-search-bar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-table-search-bar>
    `);
  });
});
