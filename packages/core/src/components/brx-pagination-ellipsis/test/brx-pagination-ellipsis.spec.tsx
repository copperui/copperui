import { newSpecPage } from '@stencil/core/testing';
import { BrxPaginationEllipsis } from '../brx-pagination-ellipsis';

describe('brx-pagination-ellipsis', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxPaginationEllipsis],
      html: `<brx-pagination-ellipsis></brx-pagination-ellipsis>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-pagination-ellipsis>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-pagination-ellipsis>
    `);
  });
});
