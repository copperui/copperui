import { newSpecPage } from '@stencil/core/testing';
import { BrxMenuSocialNetwork } from '../brx-menu-social-network';

describe('brx-menu-social-network', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMenuSocialNetwork],
      html: `<brx-menu-social-network></brx-menu-social-network>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-menu-social-network>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-menu-social-network>
    `);
  });
});
