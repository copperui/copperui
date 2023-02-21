import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderInfo } from '../brx-header-info';

describe('brx-header-info', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderInfo],
      html: `<brx-header-info></brx-header-info>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-info>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-info>
    `);
  });
});
