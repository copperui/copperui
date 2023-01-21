import { newE2EPage } from '@stencil/core/testing';

describe('brx-tab', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-tab></brx-tab>');

    const element = await page.find('brx-tab');
    expect(element).toHaveClass('hydrated');
  });
});
