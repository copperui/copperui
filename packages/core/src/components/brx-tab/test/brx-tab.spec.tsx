import { newSpecPage } from '@stencil/core/testing';
import { BrxTab } from '../brx-tab';

describe('brx-tab', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTab],
      html: `<brx-tab></brx-tab>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-tab>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-tab>
    `);
  });
});
