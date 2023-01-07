import { newE2EPage } from '@stencil/core/testing';

describe('brx-accordion-legacy-entry-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-accordion-legacy-entry-content></brx-accordion-legacy-entry-content>');

    const element = await page.find('brx-accordion-legacy-entry-content');
    expect(element).toHaveClass('hydrated');
  });
});
