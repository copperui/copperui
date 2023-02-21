import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderSignIn } from '../brx-header-sign-in';

describe('brx-header-sign-in', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderSignIn],
      html: `<brx-header-sign-in></brx-header-sign-in>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-sign-in>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-sign-in>
    `);
  });
});
