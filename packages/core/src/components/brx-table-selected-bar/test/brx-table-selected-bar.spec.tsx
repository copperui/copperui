import { newSpecPage } from '@stencil/core/testing';
import { BrxTableSelectedBar } from '../brx-table-selected-bar';

describe('brx-table-selected-bar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTableSelectedBar],
      html: `<brx-table-selected-bar></brx-table-selected-bar>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-table-selected-bar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-table-selected-bar>
    `);
  });
});
