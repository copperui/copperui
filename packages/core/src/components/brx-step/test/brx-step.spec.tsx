import { newSpecPage } from '@stencil/core/testing';
import { BrxStep } from '../brx-step';

describe('brx-step', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxStep],
      html: `<brx-step></brx-step>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-step>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-step>
    `);
  });
});
