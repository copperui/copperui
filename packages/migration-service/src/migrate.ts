import * as DOMUtils from 'https://esm.sh/domutils@3.0.1';
import { format } from 'https://esm.sh/prettier@2.8.4';
import parserHTML from 'https://esm.sh/prettier@2.8.4/parser-html';
import { addClass, hasClass, parseClassNames, removeClass, setClass } from './helpers.ts';
import { HTMLElementMigrator } from './services/HTMLElementMigrator.ts';
import { HTMLMigrator } from './services/HTMLMigrator.ts';

export const migrate = async (initialHTMLString: string): Promise<string> => {
  const htmlMigrator = new HTMLMigrator();

  const SIMPLE_MAPPINGS = [
    //
    ['br-list', 'brx-list'],
  ];

  for (const [className, tag] of SIMPLE_MAPPINGS) {
    htmlMigrator.addElementMigrator(
      new HTMLElementMigrator(`.${className}`, (element) => {
        element.tagName = tag;
        removeClass(element, className);
        return Promise.resolve();
      })
    );
  }

  htmlMigrator.addElementMigrator(
    new HTMLElementMigrator(
      'a',

      (element) => {
        element.attribs['href'] = '#';
        return Promise.resolve();
      },

      (element) => {
        const href = element.attribs.href;
        return href === 'javascript: void(0)';
      }
    )
  );

  htmlMigrator.addElementMigrator(
    new HTMLElementMigrator(
      'img',

      (element) => {
        element.attribs['src'] = 'https://via.placeholder.com/150';
        return Promise.resolve();
      },

      (element) => {
        const src = element.attribs.src;
        return src.startsWith('data:');
      }
    )
  );

  htmlMigrator.addElementMigrator(
    new HTMLElementMigrator(
      'i.fas, i.fab',

      (element) => {
        element.tagName = 'brx-icon';

        element.attributes;

        const classNames = parseClassNames(element.attribs.class);

        const [, kitName] = classNames.match(/(fa[sb])/)!;
        const [, iconName] = classNames.match(/fa-([^ ]+)/)!;
        element.attribs['name'] = `fa5/${kitName}/${iconName}`;

        setClass(
          element,
          classNames
            .split(' ')
            .filter((i) => !i.startsWith('fa'))
            .join(' ')
        );

        delete element.attribs['aria-hidden'];

        return Promise.resolve();
      }
    )
  );

  htmlMigrator.addElementMigrator(
    new HTMLElementMigrator('.br-button', (element) => {
      element.tagName = 'brx-button';
      removeClass(element, 'br-button');

      if (hasClass(element, 'circle')) {
        element.attribs['circle'] = '';
        removeClass(element, 'circle');
      }

      const sizes = ['small', 'medium', 'large'];

      for (const size of sizes) {
        if (hasClass(element, size)) {
          element.attribs['size'] = size;
          removeClass(element, size);
        }
      }

      return Promise.resolve();
    })
  );

  htmlMigrator.addElementMigrator(
    new HTMLElementMigrator('.br-divider', (element) => {
      element.tagName = 'brx-divider';
      removeClass(element, 'br-divider');

      if (hasClass(element, 'vertical')) {
        element.attribs.orientation = 'vertical';
        removeClass(element, 'vertical');
      }

      return Promise.resolve();
    })
  );

  htmlMigrator.addElementMigrator(
    new HTMLElementMigrator('div.br-item', (element) => {
      element.tagName = 'brx-item';
      removeClass(element, 'br-item');

      return Promise.resolve();
    })
  );

  // START menu

  // brx-menu-item

  const MENU_SIMPLE_MAPPINGS = [
    ['menu-container', 'brx-menu-container'],

    ['menu-header', 'brx-menu-header'],
    ['menu-title', 'brx-menu-title'],
    ['menu-close', 'brx-menu-close'],

    ['menu-trigger', 'brx-menu-trigger'],

    ['menu-panel', 'brx-menu-panel'],

    ['menu-body', 'brx-menu-body'],
    ['menu-folder', 'brx-menu-folder'],

    ['menu-logos', 'brx-menu-logos'],
    ['menu-links', 'brx-menu-links'],
    ['social-network', 'brx-social-network'],
    ['social-network-title', 'brx-social-network-title'],
    ['menu-info', 'brx-menu-info'],

    ['menu-footer', 'brx-menu-footer'],

    ['menu-scrim', 'brx-menu-scrim'],
  ];

  for (const [className, tag] of MENU_SIMPLE_MAPPINGS) {
    htmlMigrator.addElementMigrator(
      new HTMLElementMigrator(`.${className}`, (element) => {
        element.tagName = tag;
        removeClass(element, className);
        return Promise.resolve();
      })
    );
  }

  htmlMigrator.addElementMigrator(
    new HTMLElementMigrator('.br-menu', (element) => {
      element.tagName = 'brx-menu';
      removeClass(element, 'br-menu');

      const VARIANTS = ['push', 'contextual'];

      for (const variant of VARIANTS) {
        if (hasClass(element, variant)) {
          element.attribs.variant = variant;
          removeClass(element, variant);
        }
      }

      const SIZES = ['small', 'medium', 'large'];

      for (const size of SIZES) {
        if (hasClass(element, size)) {
          element.attribs.size = size;
          removeClass(element, size);
        }
      }

      if (hasClass(element, 'active')) {
        element.attribs.active = '';
        removeClass(element, 'active');
      }

      return Promise.resolve();
    })
  );

  htmlMigrator.addElementMigrator(
    new HTMLElementMigrator('.menu-item', (element) => {
      removeClass(element, 'menu-item');

      const wrapper = element.cloneNode(false);
      wrapper.tagName = 'brx-menu-item';

      if (hasClass(wrapper, 'divider')) {
        removeClass(wrapper, 'divider');
        addClass(wrapper, 'brx-menu-item-divider');
      }

      if (element.attribs.href) {
        delete wrapper.attribs.href;
        wrapper.attribs.link = '';
      }

      setClass(element, 'brx-menu-item-container');

      //

      DOMUtils.replaceElement(element, wrapper);
      DOMUtils.appendChild(wrapper, element);

      return Promise.resolve();
    })
  );

  // END menu

  const HEADER_SIMPLE_MAPPINGS = [
    //
    ['header-top', 'brx-header-top'],
    ['header-logo', 'brx-header-logo'],
    ['header-sign', 'brx-header-sign'],
    ['header-actions', 'brx-header-actions'],
    ['header-links', 'brx-header-links'],
    ['header-functions', 'brx-header-functions'],
    ['header-search', 'brx-header-search'],
    ['header-info', 'brx-header-info'],
    ['header-login', 'brx-header-login'],
    ['header-sign-in', 'brx-header-sign-in'],
    ['header-avatar', 'brx-header-avatar'],
    ['header-bottom', 'brx-header-bottom'],
    ['header-menu', 'brx-header-menu'],
    ['header-menu-trigger', 'brx-header-menu-trigger'],
    ['header-title', 'brx-header-title'],
    ['header-subtitle', 'brx-header-subtitle'],
    ['header-avatar', 'brx-header-avatar'],
    ['header-search-trigger', 'brx-header-search-trigger'],
  ];

  for (const [className, tag] of HEADER_SIMPLE_MAPPINGS) {
    htmlMigrator.addElementMigrator(
      new HTMLElementMigrator(`.${className}`, (element) => {
        element.tagName = tag;
        removeClass(element, className);
        return Promise.resolve();
      })
    );
  }

  htmlMigrator.addElementMigrator(
    new HTMLElementMigrator('.br-header', (element) => {
      element.tagName = 'brx-header';
      removeClass(element, 'br-header');

      const SIZES = ['small', 'medium', 'large'];

      for (const size of SIZES) {
        if (hasClass(element, size)) {
          element.attribs.size = size;
          removeClass(element, size);
        }
      }

      if (hasClass(element, 'active')) {
        element.attribs.active = '';
        removeClass(element, 'active');
      }

      return Promise.resolve();
    })
  );

  const output = await htmlMigrator.migrateDocument(initialHTMLString);

  return format(output.replace(/></g, '>\n<'), { parser: 'html', plugins: [parserHTML] });
};
