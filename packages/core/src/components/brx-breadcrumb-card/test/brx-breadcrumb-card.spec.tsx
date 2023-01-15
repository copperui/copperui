import { newSpecPage } from '@stencil/core/testing';
import { BrxBreadcrumbCard } from '../brx-breadcrumb-card';

describe('brx-breadcrumb-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxBreadcrumbCard],
      html: `<brx-breadcrumb-card></brx-breadcrumb-card>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-breadcrumb-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-breadcrumb-card>
    `);
  });
});
