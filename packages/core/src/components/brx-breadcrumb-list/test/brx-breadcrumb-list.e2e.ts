import { newE2EPage } from '@stencil/core/testing';

describe('brx-breadcrumb-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-breadcrumb-list></brx-breadcrumb-list>');

    const element = await page.find('brx-breadcrumb-list');
    expect(element).toHaveClass('hydrated');
  });
});
