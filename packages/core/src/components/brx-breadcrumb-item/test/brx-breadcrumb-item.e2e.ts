import { newE2EPage } from '@stencil/core/testing';

describe('brx-breadcrumb-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-breadcrumb-item></brx-breadcrumb-item>');

    const element = await page.find('brx-breadcrumb-item');
    expect(element).toHaveClass('hydrated');
  });
});
