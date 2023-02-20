import { newSpecPage } from '@stencil/core/testing';
import { BrxMenuScrim } from '../brx-menu-scrim';

describe('brx-menu-scrim', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMenuScrim],
      html: `<brx-menu-scrim></brx-menu-scrim>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-menu-scrim>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-menu-scrim>
    `);
  });
});
