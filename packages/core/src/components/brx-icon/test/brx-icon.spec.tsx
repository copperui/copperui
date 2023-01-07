import { newSpecPage } from '@stencil/core/testing';
import { BrxIcon } from '../brx-icon';

describe('brx-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxIcon],
      html: `<brx-icon></brx-icon>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-icon>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-icon>
    `);
  });
});
