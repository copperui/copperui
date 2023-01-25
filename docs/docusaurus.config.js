// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'coppperui',
  tagline: 'Biblioteca não oficial de componentes para o Design System do GOVBR.',
  url: 'https://copperui.jipalab.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'copperui', // Usually your GitHub org/user name.
  projectName: 'copperui', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/copperui/copperui/tree/next/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'copperui',
        logo: {
          alt: 'Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            label: 'Documentação',
            items: [
              {
                href: '/docs/comecar-agora',
                label: 'Guia',
              },
            ],
            position: 'right',
          },

          {
            href: '/docs/componentes',
            label: 'Componentes',
            position: 'right',
          },
          {
            href: 'https://github.com/copperui/copperui',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentação',
            items: [
              {
                label: 'Guia',
                to: '/docs/comecar-agora',
              },
              {
                label: 'Instalação',
                to: '/docs/comecar-agora/instalacao',
              },
              {
                label: 'Componentes',
                to: '/docs/componentes',
              },
            ],
          },
          {
            title: 'Comunidade',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/copperui/copperui',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} jipalab. Documentação construida com Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
