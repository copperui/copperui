import { newE2EPage } from '@stencil/core/testing';

describe('brx-signin', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-signin></brx-signin>');

    const element = await page.find('brx-signin');
    expect(element).toHaveClass('hydrated');
  });
});
