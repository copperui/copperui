import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderSearchTrigger } from '../brx-header-search-trigger';

describe('brx-header-search-trigger', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderSearchTrigger],
      html: `<brx-header-search-trigger></brx-header-search-trigger>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-search-trigger>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-search-trigger>
    `);
  });
});
