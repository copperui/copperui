import { newE2EPage } from '@stencil/core/testing';

describe('brx-divider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-divider></brx-divider>');

    const element = await page.find('brx-divider');
    expect(element).toHaveClass('hydrated');
  });
});
