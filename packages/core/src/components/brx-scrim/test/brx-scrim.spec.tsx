import { newSpecPage } from '@stencil/core/testing';
import { BrxScrim } from '../brx-scrim';

describe('brx-scrim', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxScrim],
      html: `<brx-scrim></brx-scrim>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-scrim>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-scrim>
    `);
  });
});
