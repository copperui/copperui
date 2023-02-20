import { newE2EPage } from '@stencil/core/testing';

describe('brx-menu-trigger', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-menu-trigger></brx-menu-trigger>');

    const element = await page.find('brx-menu-trigger');
    expect(element).toHaveClass('hydrated');
  });
});
