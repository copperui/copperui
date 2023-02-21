import { newE2EPage } from '@stencil/core/testing';

describe('brx-header-subtitle', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header-subtitle></brx-header-subtitle>');

    const element = await page.find('brx-header-subtitle');
    expect(element).toHaveClass('hydrated');
  });
});
