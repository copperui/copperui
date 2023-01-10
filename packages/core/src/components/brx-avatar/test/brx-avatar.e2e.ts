import { newE2EPage } from '@stencil/core/testing';

describe('brx-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-avatar></brx-avatar>');

    const element = await page.find('brx-avatar');
    expect(element).toHaveClass('hydrated');
  });
});
