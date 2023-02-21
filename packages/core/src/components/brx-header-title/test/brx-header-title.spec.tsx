import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderTitle } from '../brx-header-title';

describe('brx-header-title', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderTitle],
      html: `<brx-header-title></brx-header-title>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-title>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-title>
    `);
  });
});
