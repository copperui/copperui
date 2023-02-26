import { newE2EPage } from '@stencil/core/testing';

describe('brx-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-checkbox></brx-checkbox>');

    const element = await page.find('brx-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
