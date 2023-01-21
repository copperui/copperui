import { newSpecPage } from '@stencil/core/testing';
import { BrxTabsPanels } from '../brx-tabs-panels';

describe('brx-tabs-panels', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTabsPanels],
      html: `<brx-tabs-panels></brx-tabs-panels>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-tabs-panels>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-tabs-panels>
    `);
  });
});
