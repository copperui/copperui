import { newSpecPage } from '@stencil/core/testing';
import { BrxMenuFolder } from '../brx-menu-folder';

describe('brx-menu-folder', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMenuFolder],
      html: `<brx-menu-folder></brx-menu-folder>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-menu-folder>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-menu-folder>
    `);
  });
});
