import { newE2EPage } from '@stencil/core/testing';

describe('brx-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-item></brx-item>');

    const element = await page.find('brx-item');
    expect(element).toHaveClass('hydrated');
  });
});
