import { newE2EPage } from '@stencil/core/testing';

describe('brx-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-table></brx-table>');

    const element = await page.find('brx-table');
    expect(element).toHaveClass('hydrated');
  });
});
