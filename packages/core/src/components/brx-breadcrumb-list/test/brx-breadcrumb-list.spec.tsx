import { newSpecPage } from '@stencil/core/testing';
import { BrxBreadcrumbList } from '../brx-breadcrumb-list';

describe('brx-breadcrumb-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxBreadcrumbList],
      html: `<brx-breadcrumb-list></brx-breadcrumb-list>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-breadcrumb-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-breadcrumb-list>
    `);
  });
});
