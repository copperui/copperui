import { newSpecPage } from '@stencil/core/testing';
import { BrxMenuTitle } from '../brx-menu-title';

describe('brx-menu-title', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMenuTitle],
      html: `<brx-menu-title></brx-menu-title>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-menu-title>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-menu-title>
    `);
  });
});
