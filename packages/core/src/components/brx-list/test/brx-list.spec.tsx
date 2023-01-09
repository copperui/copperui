import { newSpecPage } from '@stencil/core/testing';
import { BrxList } from '../brx-list';

describe('brx-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxList],
      html: `<brx-list></brx-list>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-list>
    `);
  });
});
