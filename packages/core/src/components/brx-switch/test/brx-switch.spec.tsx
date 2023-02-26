import { newSpecPage } from '@stencil/core/testing';
import { BrxSwitch } from '../brx-switch';

describe('brx-switch', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxSwitch],
      html: `<brx-switch></brx-switch>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-switch>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-switch>
    `);
  });
});
