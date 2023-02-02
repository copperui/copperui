import { newSpecPage } from '@stencil/core/testing';
import { BrxPagination } from '../brx-pagination';

describe('brx-pagination', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxPagination],
      html: `<brx-pagination></brx-pagination>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-pagination>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-pagination>
    `);
  });
});
