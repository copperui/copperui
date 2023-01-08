import { newE2EPage } from '@stencil/core/testing';

describe('brx-radio', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-radio></brx-radio>');

    const element = await page.find('brx-radio');
    expect(element).toHaveClass('hydrated');
  });
});
