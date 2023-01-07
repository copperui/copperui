import { createElement } from '../createElement';

export default {
  title: 'Components/Container',
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/html/configure/story-layout,
    layout: 'fullscreen',
  },
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    variant: {
      name: 'variant',

      defaultValue: '',
      description: 'Variante',

      options: ['', 'fluid', 'xl', 'lg', 'md', 'sm'],
      control: { type: 'select' },
    },
  },
};

const Template = args => `
  <div>
    <copper-container variant="${args.variant}" style="border: 2px solid black; background-color: white;">
      <h1>Conteúdo</h1>
      <copper-icon name="camera"></copper-icon>
      <p><code>${createElement('copper-container', args).replace('<', '&lt;')}</code></p>
    </copper-container>
  </div>
`;

export const Standard = Template.bind({});
Standard.args = {
  variant: '',
};

export const Fluid = Template.bind({});
Fluid.args = {
  variant: 'fluid',
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  variant: 'xl',
};

export const Large = Template.bind({});
ExtraLarge.args = {
  variant: 'lg',
};

export const Medium = Template.bind({});
Medium.args = {
  variant: 'md',
};

export const Small = Template.bind({});
Small.args = {
  variant: 'sm',
};
