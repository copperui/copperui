import { newE2EPage } from '@stencil/core/testing';

describe('brx-radio-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-radio-group></brx-radio-group>');

    const element = await page.find('brx-radio-group');
    expect(element).toHaveClass('hydrated');
  });
});
