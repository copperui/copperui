import { newE2EPage } from '@stencil/core/testing';

describe('brx-header-logo', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header-logo></brx-header-logo>');

    const element = await page.find('brx-header-logo');
    expect(element).toHaveClass('hydrated');
  });
});
