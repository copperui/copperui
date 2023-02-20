import { newSpecPage } from '@stencil/core/testing';
import { BrxMenuClose } from '../brx-menu-close';

describe('brx-menu-close', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMenuClose],
      html: `<brx-menu-close></brx-menu-close>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-menu-close>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-menu-close>
    `);
  });
});
