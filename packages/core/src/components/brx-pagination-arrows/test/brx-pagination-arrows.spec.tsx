import { newSpecPage } from '@stencil/core/testing';
import { BrxPaginationArrows } from '../brx-pagination-arrows';

describe('brx-pagination-arrows', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxPaginationArrows],
      html: `<brx-pagination-arrows></brx-pagination-arrows>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-pagination-arrows>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-pagination-arrows>
    `);
  });
});
