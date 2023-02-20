import { newE2EPage } from '@stencil/core/testing';

describe('brx-menu-panel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-menu-panel></brx-menu-panel>');

    const element = await page.find('brx-menu-panel');
    expect(element).toHaveClass('hydrated');
  });
});
