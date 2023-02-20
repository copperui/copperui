import { newE2EPage } from '@stencil/core/testing';

describe('brx-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-menu></brx-menu>');

    const element = await page.find('brx-menu');
    expect(element).toHaveClass('hydrated');
  });
});
