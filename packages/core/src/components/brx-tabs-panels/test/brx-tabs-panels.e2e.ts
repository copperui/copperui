import { newE2EPage } from '@stencil/core/testing';

describe('brx-tabs-panels', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-tabs-panels></brx-tabs-panels>');

    const element = await page.find('brx-tabs-panels');
    expect(element).toHaveClass('hydrated');
  });
});
