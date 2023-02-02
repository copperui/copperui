import { newSpecPage } from '@stencil/core/testing';
import { BrxPaginationGoToPage } from '../brx-pagination-go-to-page';

describe('brx-pagination-go-to-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxPaginationGoToPage],
      html: `<brx-pagination-go-to-page></brx-pagination-go-to-page>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-pagination-go-to-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-pagination-go-to-page>
    `);
  });
});
