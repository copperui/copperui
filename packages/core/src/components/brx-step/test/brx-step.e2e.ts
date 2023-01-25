import { newE2EPage } from '@stencil/core/testing';

describe('brx-step', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-step></brx-step>');

    const element = await page.find('brx-step');
    expect(element).toHaveClass('hydrated');
  });
});
