import { newSpecPage } from '@stencil/core/testing';
import { BrxTableTitle } from '../brx-table-title';

describe('brx-table-title', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTableTitle],
      html: `<brx-table-title></brx-table-title>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-table-title>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-table-title>
    `);
  });
});
