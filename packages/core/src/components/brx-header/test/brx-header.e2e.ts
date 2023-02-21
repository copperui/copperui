import { newE2EPage } from '@stencil/core/testing';

describe('brx-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header></brx-header>');

    const element = await page.find('brx-header');
    expect(element).toHaveClass('hydrated');
  });
});
