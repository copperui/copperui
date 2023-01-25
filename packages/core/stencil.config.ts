import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import { reactOutputTarget as react } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'copperui',
  globalScript: 'src/global/copperui.ts',
  globalStyle: 'src/global/copperui.scss',
  plugins: [
    //
    sass(),
    postcss({}),
  ],

  outputTargets: [
    react({
      componentCorePackage: '@copperui/core',
      proxiesFile: '../integration-react/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        //
        { src: './html/*', dest: './', warn: true },
      ],
    },
  ],
  buildEs5: 'prod',
  extras: {
    cloneNodeFix: true,
    experimentalImportInjection: true,
  },
};
