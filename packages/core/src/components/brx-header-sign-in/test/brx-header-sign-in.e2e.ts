import { newE2EPage } from '@stencil/core/testing';

describe('brx-header-sign-in', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header-sign-in></brx-header-sign-in>');

    const element = await page.find('brx-header-sign-in');
    expect(element).toHaveClass('hydrated');
  });
});
