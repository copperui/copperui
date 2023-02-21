import { newE2EPage } from '@stencil/core/testing';

describe('brx-header-menu-trigger', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header-menu-trigger></brx-header-menu-trigger>');

    const element = await page.find('brx-header-menu-trigger');
    expect(element).toHaveClass('hydrated');
  });
});
