import { newE2EPage } from '@stencil/core/testing';

describe('brx-header-actions', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header-actions></brx-header-actions>');

    const element = await page.find('brx-header-actions');
    expect(element).toHaveClass('hydrated');
  });
});
