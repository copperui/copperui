import { newSpecPage } from '@stencil/core/testing';
import { BrxTable } from '../brx-table';

describe('brx-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTable],
      html: `<brx-table></brx-table>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-table>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-table>
    `);
  });
});
