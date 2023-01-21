import { newE2EPage } from '@stencil/core/testing';

describe('brx-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-tabs></brx-tabs>');

    const element = await page.find('brx-tabs');
    expect(element).toHaveClass('hydrated');
  });
});
