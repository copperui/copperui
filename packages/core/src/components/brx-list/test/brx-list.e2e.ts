import { newE2EPage } from '@stencil/core/testing';

describe('brx-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-list></brx-list>');

    const element = await page.find('brx-list');
    expect(element).toHaveClass('hydrated');
  });
});
