import { newSpecPage } from '@stencil/core/testing';
import { BrxMenuHeader } from '../brx-menu-header';

describe('brx-menu-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMenuHeader],
      html: `<brx-menu-header></brx-menu-header>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-menu-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-menu-header>
    `);
  });
});
