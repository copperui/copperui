import { newE2EPage } from '@stencil/core/testing';

describe('brx-select-toggle', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-select-toggle></brx-select-toggle>');

    const element = await page.find('brx-select-toggle');
    expect(element).toHaveClass('hydrated');
  });
});
