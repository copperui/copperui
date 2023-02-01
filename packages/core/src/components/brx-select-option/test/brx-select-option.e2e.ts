import { newE2EPage } from '@stencil/core/testing';

describe('brx-select-option', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-select-option></brx-select-option>');

    const element = await page.find('brx-select-option');
    expect(element).toHaveClass('hydrated');
  });
});
