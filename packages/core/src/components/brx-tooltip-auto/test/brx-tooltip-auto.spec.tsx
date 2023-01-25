import { newSpecPage } from '@stencil/core/testing';
import { BrxTooltipAuto } from '../brx-tooltip-auto';

describe('brx-tooltip-auto', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTooltipAuto],
      html: `<brx-tooltip-auto></brx-tooltip-auto>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-tooltip-auto>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-tooltip-auto>
    `);
  });
});
