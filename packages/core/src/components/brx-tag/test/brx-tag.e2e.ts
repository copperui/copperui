import { newE2EPage } from '@stencil/core/testing';

describe('brx-tag', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-tag></brx-tag>');

    const element = await page.find('brx-tag');
    expect(element).toHaveClass('hydrated');
  });
});
