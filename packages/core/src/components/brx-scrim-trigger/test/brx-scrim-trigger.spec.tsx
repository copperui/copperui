import { newSpecPage } from '@stencil/core/testing';
import { BrxScrimTrigger } from '../brx-scrim-trigger';

describe('brx-scrim-trigger', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxScrimTrigger],
      html: `<brx-scrim-trigger></brx-scrim-trigger>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-scrim-trigger>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-scrim-trigger>
    `);
  });
});
