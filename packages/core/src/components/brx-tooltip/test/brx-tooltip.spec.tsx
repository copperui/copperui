import { newSpecPage } from '@stencil/core/testing';
import { BrxTooltip } from '../brx-tooltip';

describe('brx-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTooltip],
      html: `<brx-tooltip></brx-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-tooltip>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-tooltip>
    `);
  });
});
