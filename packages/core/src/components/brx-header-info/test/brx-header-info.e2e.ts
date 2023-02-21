import { newE2EPage } from '@stencil/core/testing';

describe('brx-header-info', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header-info></brx-header-info>');

    const element = await page.find('brx-header-info');
    expect(element).toHaveClass('hydrated');
  });
});
