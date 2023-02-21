import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderActions } from '../brx-header-actions';

describe('brx-header-actions', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderActions],
      html: `<brx-header-actions></brx-header-actions>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-actions>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-actions>
    `);
  });
});
