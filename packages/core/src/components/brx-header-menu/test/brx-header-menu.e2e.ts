import { newE2EPage } from '@stencil/core/testing';

describe('brx-header-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header-menu></brx-header-menu>');

    const element = await page.find('brx-header-menu');
    expect(element).toHaveClass('hydrated');
  });
});
