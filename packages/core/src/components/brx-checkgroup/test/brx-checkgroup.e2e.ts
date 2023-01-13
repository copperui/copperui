import { newE2EPage } from '@stencil/core/testing';

describe('brx-checkgroup', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-checkgroup></brx-checkgroup>');

    const element = await page.find('brx-checkgroup');
    expect(element).toHaveClass('hydrated');
  });
});
