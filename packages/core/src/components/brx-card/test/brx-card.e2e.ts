import { newE2EPage } from '@stencil/core/testing';

describe('brx-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-card></brx-card>');

    const element = await page.find('brx-card');
    expect(element).toHaveClass('hydrated');
  });
});
