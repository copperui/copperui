import { newE2EPage } from '@stencil/core/testing';

describe('brx-upload', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-upload></brx-upload>');

    const element = await page.find('brx-upload');
    expect(element).toHaveClass('hydrated');
  });
});
