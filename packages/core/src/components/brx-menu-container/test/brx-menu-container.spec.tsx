import { newSpecPage } from '@stencil/core/testing';
import { BrxMenuContainer } from '../brx-menu-container';

describe('brx-menu-container', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMenuContainer],
      html: `<brx-menu-container></brx-menu-container>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-menu-container>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-menu-container>
    `);
  });
});
