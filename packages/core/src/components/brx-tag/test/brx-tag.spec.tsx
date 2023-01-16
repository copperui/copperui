import { newSpecPage } from '@stencil/core/testing';
import { BrxTag } from '../brx-tag';

describe('brx-tag', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTag],
      html: `<brx-tag></brx-tag>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-tag>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-tag>
    `);
  });
});
