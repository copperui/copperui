import { newSpecPage } from '@stencil/core/testing';
import { BrxLoading } from '../brx-loading';

describe('brx-loading', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxLoading],
      html: `<brx-loading></brx-loading>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-loading>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-loading>
    `);
  });
});
