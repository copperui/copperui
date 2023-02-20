import { newSpecPage } from '@stencil/core/testing';
import { BrxMenuFooter } from '../brx-menu-footer';

describe('brx-menu-footer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMenuFooter],
      html: `<brx-menu-footer></brx-menu-footer>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-menu-footer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-menu-footer>
    `);
  });
});
