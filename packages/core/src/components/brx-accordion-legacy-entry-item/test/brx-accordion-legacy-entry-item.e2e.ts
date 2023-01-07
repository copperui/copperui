import { newE2EPage } from '@stencil/core/testing';

describe('brx-accordion-legacy-entry-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-accordion-legacy-entry-item></brx-accordion-legacy-entry-item>');

    const element = await page.find('brx-accordion-legacy-entry-item');
    expect(element).toHaveClass('hydrated');
  });
});
