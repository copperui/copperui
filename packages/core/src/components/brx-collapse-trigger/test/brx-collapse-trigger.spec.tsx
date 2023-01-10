import { newSpecPage } from '@stencil/core/testing';
import { BrxCollapseTrigger } from '../brx-collapse-trigger';

describe('brx-collapse-trigger', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxCollapseTrigger],
      html: `<brx-collapse-trigger></brx-collapse-trigger>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-collapse-trigger>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-collapse-trigger>
    `);
  });
});
