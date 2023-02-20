import { newSpecPage } from '@stencil/core/testing';
import { BrxMenuBody } from '../brx-menu-body';

describe('brx-menu-body', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMenuBody],
      html: `<brx-menu-body></brx-menu-body>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-menu-body>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-menu-body>
    `);
  });
});
