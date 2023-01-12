import { newE2EPage } from '@stencil/core/testing';

describe('brx-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-input></brx-input>');

    const element = await page.find('brx-input');
    expect(element).toHaveClass('hydrated');
  });
});
