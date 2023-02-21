import { newSpecPage } from '@stencil/core/testing';
import { BrxTableHeaderTopBar } from '../brx-table-header-top-bar';

describe('brx-table-header-top-bar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTableHeaderTopBar],
      html: `<brx-table-header-top-bar></brx-table-header-top-bar>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-table-header-top-bar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-table-header-top-bar>
    `);
  });
});
