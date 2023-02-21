import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderTop } from '../brx-header-top';

describe('brx-header-top', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderTop],
      html: `<brx-header-top></brx-header-top>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-top>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-top>
    `);
  });
});
