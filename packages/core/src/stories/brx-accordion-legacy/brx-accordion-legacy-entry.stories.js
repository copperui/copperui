export default {
  title: 'Components/AccordionLegacyEntry',
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/html/configure/story-layout,
    layout: 'fullscreen',
  },
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const renderEntry = args => `
<brx-accordion-legacy-entry${args.headerTitle ? ` header-title="${args.headerTitle}"` : ''}${args.content ? ` content="${args.content}"` : ''}>
${args.slotTitle ? `  <span slot="title">${args.slotTitle}</span>\n` : ''}${
  args.slotContent ? `  <div slot="content">${args.slotContent}</div>\n` : ''
}</brx-accordion-legacy-entry>
`;

const Template = args => {
  const code = `<brx-accordion-legacy${args.single ? ` single` : ''}${args.negative ? ` negative` : ''}>${Array.from({ length: 2 })
    .map(() => renderEntry(args))
    .join('')}</brx-accordion-legacy>`;

  return `
 <div>
 ${code}
 <pre><code>${code.replaceAll('<', '&lt;')}</code></pre>
 </div>
  `.trim();
};

export const Default = Template.bind({});
Default.args = {
  headerTitle: 'Título (prop)',
  slotContent: 'Conteúdo (slot)',
};

export const Single = Template.bind({});
Single.args = {
  single: true,
  headerTitle: 'Título (prop)',
  slotContent: 'Conteúdo (slot)',
};

export const Negative = Template.bind({});
Negative.args = {
  negative: true,
  headerTitle: 'Título (prop)',
  slotContent: 'Conteúdo (slot)',
};

const EntryTemplate = args => {
  const code = renderEntry(args);

  return `
 <div>
    <pre><code>${code.replaceAll('<', '&lt;')}</code></pre>
    <brx-accordion-legacy>${code}</brx-accordion-legacy>
 </div>
  `.trim();
};

export const EntryTitlePropContentSlot = EntryTemplate.bind({});
EntryTitlePropContentSlot.args = {
  headerTitle: 'Título (prop)',
  slotContent: 'Conteúdo (slot)',
};

export const EntryTitlePropContentProp = EntryTemplate.bind({});
EntryTitlePropContentProp.args = {
  headerTitle: 'Título (prop)',
  content: 'Conteúdo (prop)',
};

export const EntryTitleSlotContentSlot = EntryTemplate.bind({});
EntryTitleSlotContentSlot.args = {
  slotTitle: 'Título (slot)',
  slotContent: 'Conteúdo (slot)',
};
