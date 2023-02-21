import { newE2EPage } from '@stencil/core/testing';

describe('brx-header-login', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header-login></brx-header-login>');

    const element = await page.find('brx-header-login');
    expect(element).toHaveClass('hydrated');
  });
});
