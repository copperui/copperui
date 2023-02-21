import { newE2EPage } from '@stencil/core/testing';

describe('brx-header-functions', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header-functions></brx-header-functions>');

    const element = await page.find('brx-header-functions');
    expect(element).toHaveClass('hydrated');
  });
});
