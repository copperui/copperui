import { newSpecPage } from '@stencil/core/testing';
import { BrxDivider } from '../brx-divider';

describe('brx-divider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxDivider],
      html: `<brx-divider></brx-divider>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-divider>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-divider>
    `);
  });
});
