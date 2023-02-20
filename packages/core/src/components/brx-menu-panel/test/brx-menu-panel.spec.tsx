import { newSpecPage } from '@stencil/core/testing';
import { BrxMenuPanel } from '../brx-menu-panel';

describe('brx-menu-panel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMenuPanel],
      html: `<brx-menu-panel></brx-menu-panel>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-menu-panel>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-menu-panel>
    `);
  });
});
