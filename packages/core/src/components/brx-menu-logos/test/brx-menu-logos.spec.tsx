import { newSpecPage } from '@stencil/core/testing';
import { BrxMenuLogos } from '../brx-menu-logos';

describe('brx-menu-logos', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMenuLogos],
      html: `<brx-menu-logos></brx-menu-logos>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-menu-logos>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-menu-logos>
    `);
  });
});
