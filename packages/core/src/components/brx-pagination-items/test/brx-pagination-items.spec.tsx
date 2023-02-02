import { newSpecPage } from '@stencil/core/testing';
import { BrxPaginationItems } from '../brx-pagination-items';

describe('brx-pagination-items', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxPaginationItems],
      html: `<brx-pagination-items></brx-pagination-items>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-pagination-items>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-pagination-items>
    `);
  });
});
