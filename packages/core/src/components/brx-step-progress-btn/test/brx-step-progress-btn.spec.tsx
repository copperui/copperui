import { newSpecPage } from '@stencil/core/testing';
import { BrxStepProgressBtn } from '../brx-step-progress-btn';

describe('brx-step-progress-btn', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxStepProgressBtn],
      html: `<brx-step-progress-btn></brx-step-progress-btn>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-step-progress-btn>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-step-progress-btn>
    `);
  });
});
