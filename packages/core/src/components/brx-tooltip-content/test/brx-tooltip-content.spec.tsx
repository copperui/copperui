import { newSpecPage } from '@stencil/core/testing';
import { BrxTooltipContent } from '../brx-tooltip-content';

describe('brx-tooltip-content', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTooltipContent],
      html: `<brx-tooltip-content></brx-tooltip-content>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-tooltip-content>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-tooltip-content>
    `);
  });
});
