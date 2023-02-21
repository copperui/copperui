import { newE2EPage } from '@stencil/core/testing';

describe('brx-header-sign', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header-sign></brx-header-sign>');

    const element = await page.find('brx-header-sign');
    expect(element).toHaveClass('hydrated');
  });
});
