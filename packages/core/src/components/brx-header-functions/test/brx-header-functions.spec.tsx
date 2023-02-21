import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderFunctions } from '../brx-header-functions';

describe('brx-header-functions', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderFunctions],
      html: `<brx-header-functions></brx-header-functions>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-functions>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-functions>
    `);
  });
});
