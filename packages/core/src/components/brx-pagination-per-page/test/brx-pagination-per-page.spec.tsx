import { newSpecPage } from '@stencil/core/testing';
import { BrxPaginationPerPage } from '../brx-pagination-per-page';

describe('brx-pagination-per-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxPaginationPerPage],
      html: `<brx-pagination-per-page></brx-pagination-per-page>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-pagination-per-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-pagination-per-page>
    `);
  });
});
