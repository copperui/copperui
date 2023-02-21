import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderLogin } from '../brx-header-login';

describe('brx-header-login', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderLogin],
      html: `<brx-header-login></brx-header-login>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-login>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-login>
    `);
  });
});
