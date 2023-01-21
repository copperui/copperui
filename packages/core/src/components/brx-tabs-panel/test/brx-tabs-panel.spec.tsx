import { newSpecPage } from '@stencil/core/testing';
import { BrxTabsPanel } from '../brx-tabs-panel';

describe('brx-tabs-panel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTabsPanel],
      html: `<brx-tabs-panel></brx-tabs-panel>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-tabs-panel>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-tabs-panel>
    `);
  });
});
