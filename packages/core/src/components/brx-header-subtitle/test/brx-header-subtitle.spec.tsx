import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderSubtitle } from '../brx-header-subtitle';

describe('brx-header-subtitle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderSubtitle],
      html: `<brx-header-subtitle></brx-header-subtitle>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-subtitle>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-subtitle>
    `);
  });
});
