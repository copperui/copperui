import { newSpecPage } from '@stencil/core/testing';
import { BrxMenuInfo } from '../brx-menu-info';

describe('brx-menu-info', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMenuInfo],
      html: `<brx-menu-info></brx-menu-info>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-menu-info>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-menu-info>
    `);
  });
});
