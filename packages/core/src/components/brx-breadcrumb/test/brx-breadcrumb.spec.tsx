import { newSpecPage } from '@stencil/core/testing';
import { BrxBreadcrumb } from '../brx-breadcrumb';

describe('brx-breadcrumb', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxBreadcrumb],
      html: `<brx-breadcrumb></brx-breadcrumb>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-breadcrumb>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-breadcrumb>
    `);
  });
});
