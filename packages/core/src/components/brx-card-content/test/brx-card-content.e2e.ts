import { newE2EPage } from '@stencil/core/testing';

describe('brx-card-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-card-content></brx-card-content>');

    const element = await page.find('brx-card-content');
    expect(element).toHaveClass('hydrated');
  });
});
