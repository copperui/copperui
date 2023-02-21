import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderSign } from '../brx-header-sign';

describe('brx-header-sign', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderSign],
      html: `<brx-header-sign></brx-header-sign>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-sign>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-sign>
    `);
  });
});
