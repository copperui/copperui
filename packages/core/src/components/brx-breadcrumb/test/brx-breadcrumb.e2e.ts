import { newE2EPage } from '@stencil/core/testing';

describe('brx-breadcrumb', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-breadcrumb></brx-breadcrumb>');

    const element = await page.find('brx-breadcrumb');
    expect(element).toHaveClass('hydrated');
  });
});
