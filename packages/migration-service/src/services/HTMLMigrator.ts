import { parseDocument, renderDocument } from '../helpers.ts';
import { HTMLElementMigrator } from './HTMLElementMigrator.ts';

export class HTMLMigrator {
  #elementMigrators = new Set<HTMLElementMigrator>();

  addElementMigrator(elementMigrator: HTMLElementMigrator) {
    this.#elementMigrators.add(elementMigrator);
  }

  addElementMigrators(...elementMigrators: HTMLElementMigrator[]) {
    for (const elementMigrator of elementMigrators) {
      this.addElementMigrator(elementMigrator);
    }
  }

  private getNextElementMigrator(htmlString: string) {
    const elementMigrators = Array.from(this.#elementMigrators);
    return elementMigrators.find((elementMigrator) => elementMigrator.hasNextTarget(htmlString)) ?? null;
  }

  private prepareHTMLString(htmlString: string) {
    return renderDocument(parseDocument(htmlString));
  }

  async migrateDocument(initialHTMLString: string) {
    let elementMigrator: HTMLElementMigrator | null = null;

    let currentHTMLString = this.prepareHTMLString(initialHTMLString);

    do {
      elementMigrator = this.getNextElementMigrator(currentHTMLString);

      if (elementMigrator === null) {
        break;
      }

      const nextHTMLString = await elementMigrator.migrateDocument(currentHTMLString);
      currentHTMLString = this.prepareHTMLString(nextHTMLString);
    } while (true);

    return currentHTMLString;
  }
}
