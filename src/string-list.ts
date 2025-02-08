import { AbstractList } from '~/abstract-list';

export class StringList extends AbstractList<string> {
  static of(...items: string[]): StringList {
    return new StringList(items);
  }

  join(seperator?: string): string {
    return this.items.join(seperator);
  }

  map(mapper: (item: string) => string): StringList {
    return new StringList(this.items.map(mapper));
  }
}
