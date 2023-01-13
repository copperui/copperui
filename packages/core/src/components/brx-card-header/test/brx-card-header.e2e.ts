import { newE2EPage } from '@stencil/core/testing';

describe('brx-card-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-card-header></brx-card-header>');

    const element = await page.find('brx-card-header');
    expect(element).toHaveClass('hydrated');
  });
});
