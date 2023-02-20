import { newE2EPage } from '@stencil/core/testing';

describe('brx-menu-info', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-menu-info></brx-menu-info>');

    const element = await page.find('brx-menu-info');
    expect(element).toHaveClass('hydrated');
  });
});
