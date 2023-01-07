export default {
  title: 'Components/Icon',
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/html/configure/story-layout,
    layout: 'fullscreen',
  },
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    name: {
      name: 'name',

      defaultValue: '',
      description: 'Nome do ícone. Pode ser projeto/escopo/icone ou icone (fa5/fas/icone).',
    },

    loadResources: {
      name: 'load-resources',

      defaultValue: true,
      description: 'Define se o ícone deve ser carregado automaticamente.',
    },
  },
};

const Template = args => `
  <brx-icon load-resources="${args.loadResources}" name="${args.name}"></brx-icon>
`;

export const Fa5Solid = Template.bind({});
Fa5Solid.args = {
  loadResources: true,
  name: 'camera',
};

export const Fa5SolidSpecifier = Template.bind({});
Fa5SolidSpecifier.args = {
  loadResources: true,
  name: 'fa5/fas/frog',
};
