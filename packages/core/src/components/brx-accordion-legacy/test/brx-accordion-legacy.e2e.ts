import { newE2EPage } from '@stencil/core/testing';

describe('brx-accordion-legacy', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-accordion-legacy></brx-accordion-legacy>');

    const element = await page.find('brx-accordion-legacy');
    expect(element).toHaveClass('hydrated');
  });
});
