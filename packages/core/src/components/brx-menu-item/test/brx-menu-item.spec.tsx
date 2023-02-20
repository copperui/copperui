import { newSpecPage } from '@stencil/core/testing';
import { BrxMenuItem } from '../brx-menu-item';

describe('brx-menu-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMenuItem],
      html: `<brx-menu-item></brx-menu-item>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-menu-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-menu-item>
    `);
  });
});
