import { newSpecPage } from '@stencil/core/testing';
import { BrxTableHeader } from '../brx-table-header';

describe('brx-table-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTableHeader],
      html: `<brx-table-header></brx-table-header>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-table-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-table-header>
    `);
  });
});
