import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderSearch } from '../brx-header-search';

describe('brx-header-search', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderSearch],
      html: `<brx-header-search></brx-header-search>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-search>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-search>
    `);
  });
});
