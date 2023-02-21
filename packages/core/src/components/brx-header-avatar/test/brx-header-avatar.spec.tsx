import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderAvatar } from '../brx-header-avatar';

describe('brx-header-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderAvatar],
      html: `<brx-header-avatar></brx-header-avatar>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-avatar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-avatar>
    `);
  });
});
