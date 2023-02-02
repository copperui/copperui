import { newSpecPage } from '@stencil/core/testing';
import { BrxPaginationInformation } from '../brx-pagination-information';

describe('brx-pagination-information', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxPaginationInformation],
      html: `<brx-pagination-information></brx-pagination-information>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-pagination-information>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-pagination-information>
    `);
  });
});
