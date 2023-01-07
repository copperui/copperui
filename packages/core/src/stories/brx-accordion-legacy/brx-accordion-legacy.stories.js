export default {
  title: 'Components/AccordionLegacy',
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/html/configure/story-layout,
    layout: 'fullscreen',
  },
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const renderEntry = args => {
  return `
<brx-accordion-legacy-entry ${args.headerTitle ? `header-title="${args.headerTitle}"` : ''} ${args.content ? `content="${args.content}"` : ''}>
  ${args.slotTitle ? `<span slot="title">${args.slotTitle}</span>` : ''}  
  ${args.slotContent ? `<div slot="content">${args.slotContent}</div>` : ''}  
</brx-accordion-legacy-entry>
`.trim();
};

const Template = args => `
<brx-accordion-legacy>
  ${Array.from({ length: 3 })
    .map(() => renderEntry(args))
    .join('')}
</brx-accordion-legacy>
`;

export const EntryTitlePropContentSlot = Template.bind({});
EntryTitlePropContentSlot.args = {
  headerTitle: 'Título (prop)',
  slotContent: 'Conteúdo (slot)',
};

export const EntryTitlePropContentProp = Template.bind({});
EntryTitlePropContentProp.args = {
  headerTitle: 'Título (prop)',
  content: 'Conteúdo (prop)',
};

export const EntryTitleSlotContentSlot = Template.bind({});
EntryTitleSlotContentSlot.args = {
  slotTitle: 'Título (slot)',
  slotContent: 'Conteúdo (slot)',
};
