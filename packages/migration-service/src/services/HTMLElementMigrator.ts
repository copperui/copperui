import { selectAll } from 'https://esm.sh/css-select@5.1.0';
import { Document, Element } from 'https://esm.sh/domhandler@5.0.3';
import { parseDocument, renderDocument } from '../helpers.ts';

export type IHTMLElementMigratorHandler = (
  element: Element,
  doc: Document,
  htmlString: string
) => Promise<void | string | Document>;

export class HTMLElementMigrator {
  constructor(
    private selector: string,
    private handler: IHTMLElementMigratorHandler,
    private shouldHandleElement: (element: Element, doc: Document, htmlString: string) => boolean = () => true
  ) {}

  findNextTarget(doc: Document, htmlString: string) {
    const targets = Array.from(<unknown[]>selectAll(this.selector, doc)) as Element[];
    const target = targets.find((target) => this.shouldHandleElement(target, doc, htmlString)) ?? null;
    return target;
  }

  hasNextTarget(htmlString: string) {
    const doc = parseDocument(htmlString);
    return this.findNextTarget(doc, htmlString) !== null;
  }

  async migrateElement(element: Element, doc: Document, htmlString: string): Promise<string> {
    const output = await this.handler(element, doc, htmlString);

    if (typeof output === 'string') {
      return output;
    }

    return renderDocument(output ?? doc);
  }

  async migrateDocument(htmlString: string): Promise<string> {
    const doc = parseDocument(htmlString);

    const element = this.findNextTarget(doc, htmlString) as Element | null;

    if (element) {
      return await this.migrateElement(element, doc, htmlString);
    }

    return htmlString;
  }
}
