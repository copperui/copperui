import { newE2EPage } from '@stencil/core/testing';

describe('brx-skiplink', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-skiplink></brx-skiplink>');

    const element = await page.find('brx-skiplink');
    expect(element).toHaveClass('hydrated');
  });
});
