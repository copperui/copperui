import { newE2EPage } from '@stencil/core/testing';

describe('brx-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-select></brx-select>');

    const element = await page.find('brx-select');
    expect(element).toHaveClass('hydrated');
  });
});
