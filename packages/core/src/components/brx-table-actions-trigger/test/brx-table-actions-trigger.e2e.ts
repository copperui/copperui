import { newE2EPage } from '@stencil/core/testing';

describe('brx-table-actions-trigger', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-table-actions-trigger></brx-table-actions-trigger>');

    const element = await page.find('brx-table-actions-trigger');
    expect(element).toHaveClass('hydrated');
  });
});
