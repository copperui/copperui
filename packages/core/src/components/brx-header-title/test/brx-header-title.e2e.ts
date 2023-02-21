import { newE2EPage } from '@stencil/core/testing';

describe('brx-header-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header-title></brx-header-title>');

    const element = await page.find('brx-header-title');
    expect(element).toHaveClass('hydrated');
  });
});
