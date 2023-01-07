import { newE2EPage } from '@stencil/core/testing';

describe('brx-loading', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-loading></brx-loading>');

    const element = await page.find('brx-loading');
    expect(element).toHaveClass('hydrated');
  });
});
