import { AbstractList } from '~/abstract-list';
import { AddableList } from '~/addable-list';
import { ComparableList } from '~/comparable-list';
import { Addable, Comparable, Mergeable } from '~/interface';
import { MergeableList } from '~/mergeable-list';
import { NumberList } from '~/number-list';

export class StringList extends AbstractList<string> {
  constructor(items: string[] = []) {
    super(items);
  }

  static from(iterable: Iterable<string> | ArrayLike<string> = []): StringList {
    return new StringList(Array.from(iterable));
  }

  static of(...items: string[]): StringList {
    return new StringList(items);
  }

  distinct(): StringList {
    return StringList.from(super.doDistinct());
  }

  filter(predicate: (value: string, index?: number, array?: string[]) => boolean): StringList {
    return new StringList(this.items.filter(predicate));
  }

  filterEmpty(): StringList {
    return new StringList(this.items.filter(this.nonNullable));
  }

  flatMap(mapper: (item: string, index?: number, array?: string[]) => string[]): StringList {
    return new StringList(this.items.flatMap(mapper));
  }

  flattenToAddableList<K extends Addable<K>>(mapper: (item: string) => K[]): AddableList<K> {
    return new AddableList(this.items.flatMap(item => mapper(item)));
  }

  flattenToComparableList<K extends Comparable<K>>(mapper: (item: string) => K[]): ComparableList<K> {
    return new ComparableList(this.items.flatMap(item => mapper(item)));
  }

  flattenToMergeableList<K extends Mergeable<K>>(mapper: (item: string) => K[]): MergeableList<K> {
    return new MergeableList(this.items.flatMap(item => mapper(item)));
  }

  flattenToNumberList(mapper: (item: string) => number[]): NumberList {
    return new NumberList(this.items.flatMap(item => mapper(item)));
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

  toMergeableList<K extends Mergeable<K>>(mapper: (item: string) => K): MergeableList<K> {
    return new MergeableList(this.items.map(item => mapper(item)));
  }

  toNumberList(mapper: (item: string) => number): NumberList {
    return new NumberList(this.items.map(item => mapper(item)));
  }
}
