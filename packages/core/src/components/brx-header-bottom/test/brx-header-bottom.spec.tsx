import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderBottom } from '../brx-header-bottom';

describe('brx-header-bottom', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderBottom],
      html: `<brx-header-bottom></brx-header-bottom>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-bottom>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-bottom>
    `);
  });
});
