import { newE2EPage } from '@stencil/core/testing';

describe('brx-menu-close', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-menu-close></brx-menu-close>');

    const element = await page.find('brx-menu-close');
    expect(element).toHaveClass('hydrated');
  });
});
