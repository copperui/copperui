import { newSpecPage } from '@stencil/core/testing';
import { BrxPaginationItem } from '../brx-pagination-item';

describe('brx-pagination-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxPaginationItem],
      html: `<brx-pagination-item></brx-pagination-item>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-pagination-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-pagination-item>
    `);
  });
});
