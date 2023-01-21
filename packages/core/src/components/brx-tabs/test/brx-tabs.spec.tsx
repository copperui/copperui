import { newSpecPage } from '@stencil/core/testing';
import { BrxTabs } from '../brx-tabs';

describe('brx-tabs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTabs],
      html: `<brx-tabs></brx-tabs>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-tabs>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-tabs>
    `);
  });
});
