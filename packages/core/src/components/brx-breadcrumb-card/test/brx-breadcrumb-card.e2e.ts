import { newE2EPage } from '@stencil/core/testing';

describe('brx-breadcrumb-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-breadcrumb-card></brx-breadcrumb-card>');

    const element = await page.find('brx-breadcrumb-card');
    expect(element).toHaveClass('hydrated');
  });
});
