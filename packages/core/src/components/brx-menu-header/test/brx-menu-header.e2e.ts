import { newE2EPage } from '@stencil/core/testing';

describe('brx-menu-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-menu-header></brx-menu-header>');

    const element = await page.find('brx-menu-header');
    expect(element).toHaveClass('hydrated');
  });
});
