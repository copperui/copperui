import { newSpecPage } from '@stencil/core/testing';
import { BrxStepProgress } from '../brx-step-progress';

describe('brx-step-progress', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxStepProgress],
      html: `<brx-step-progress></brx-step-progress>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-step-progress>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-step-progress>
    `);
  });
});
