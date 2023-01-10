import { newSpecPage } from '@stencil/core/testing';
import { BrxAvatar } from '../brx-avatar';

describe('brx-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxAvatar],
      html: `<brx-avatar></brx-avatar>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-avatar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-avatar>
    `);
  });
});
