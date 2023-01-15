import { newSpecPage } from '@stencil/core/testing';
import { BrxBreadcrumbItem } from '../brx-breadcrumb-item';

describe('brx-breadcrumb-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxBreadcrumbItem],
      html: `<brx-breadcrumb-item></brx-breadcrumb-item>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-breadcrumb-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-breadcrumb-item>
    `);
  });
});
