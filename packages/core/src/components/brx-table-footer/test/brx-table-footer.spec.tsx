import { newSpecPage } from '@stencil/core/testing';
import { BrxTableFooter } from '../brx-table-footer';

describe('brx-table-footer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTableFooter],
      html: `<brx-table-footer></brx-table-footer>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-table-footer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-table-footer>
    `);
  });
});
