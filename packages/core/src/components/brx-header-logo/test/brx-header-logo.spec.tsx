import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderLogo } from '../brx-header-logo';

describe('brx-header-logo', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderLogo],
      html: `<brx-header-logo></brx-header-logo>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-logo>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-logo>
    `);
  });
});
