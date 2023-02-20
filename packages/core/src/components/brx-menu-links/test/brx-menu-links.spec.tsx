import { newSpecPage } from '@stencil/core/testing';
import { BrxMenuLinks } from '../brx-menu-links';

describe('brx-menu-links', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMenuLinks],
      html: `<brx-menu-links></brx-menu-links>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-menu-links>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-menu-links>
    `);
  });
});
