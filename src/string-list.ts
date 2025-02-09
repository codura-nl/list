import { AbstractList } from '~/abstract-list';
import { AddableList } from '~/addable-list';
import { ComparableList } from '~/comparable-list';
import { FlattenableList } from '~/flattenable-list';
import { Addable, Comparable, Flattenable, Mergeable } from '~/interface';
import { MergeableList } from '~/mergeable-list';
import { NumberList } from '~/number-list';

export class StringList extends AbstractList<string> {
  constructor(items?: string[]) {
    super(items);
  }

  static of(...items: string[]): StringList {
    return new StringList(items);
  }

  filter(predicate: (value: string, index?: number, array?: string[]) => boolean): StringList {
    return new StringList(this.items.filter(predicate));
  }

  join(seperator?: string): string {
    return this.items.join(seperator);
  }

  map(mapper: (value: string, index?: number, array?: string[]) => string): StringList {
    return new StringList(this.items.map(mapper));
  }

  toAddableList<K extends Addable<K>>(mapper: (item: string) => K): AddableList<K> {
    return new AddableList(this.items.map(item => mapper(item)));
  }

  toComparableList<K extends Comparable<K>>(mapper: (item: string) => K): ComparableList<K> {
    return new ComparableList(this.items.map(item => mapper(item)));
  }

  toFlattenableList<K extends Flattenable<K>>(mapper: (item: string) => K): FlattenableList<K> {
    return new FlattenableList(this.items.map(item => mapper(item)));
  }

  toMergeableList<K extends Mergeable<K>>(mapper: (item: string) => K): MergeableList<K> {
    return new MergeableList(this.items.map(item => mapper(item)));
  }

  toNumberList(mapper: (item: string) => number): NumberList {
    return new NumberList(this.items.map(item => mapper(item)));
  }
}
