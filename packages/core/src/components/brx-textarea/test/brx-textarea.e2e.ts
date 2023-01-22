import { newE2EPage } from '@stencil/core/testing';

describe('brx-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-textarea></brx-textarea>');

    const element = await page.find('brx-textarea');
    expect(element).toHaveClass('hydrated');
  });
});
