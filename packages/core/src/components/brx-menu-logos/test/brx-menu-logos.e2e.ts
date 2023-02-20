import { newE2EPage } from '@stencil/core/testing';

describe('brx-menu-logos', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-menu-logos></brx-menu-logos>');

    const element = await page.find('brx-menu-logos');
    expect(element).toHaveClass('hydrated');
  });
});
