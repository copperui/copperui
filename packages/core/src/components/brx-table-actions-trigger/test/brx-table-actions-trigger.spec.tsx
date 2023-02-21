import { newSpecPage } from '@stencil/core/testing';
import { BrxTableActionsTrigger } from '../brx-table-actions-trigger';

describe('brx-table-actions-trigger', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTableActionsTrigger],
      html: `<brx-table-actions-trigger></brx-table-actions-trigger>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-table-actions-trigger>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-table-actions-trigger>
    `);
  });
});
