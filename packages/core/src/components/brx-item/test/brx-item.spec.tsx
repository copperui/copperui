import { newSpecPage } from '@stencil/core/testing';
import { BrxItem } from '../brx-item';

describe('brx-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxItem],
      html: `<brx-item></brx-item>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-item>
    `);
  });
});
