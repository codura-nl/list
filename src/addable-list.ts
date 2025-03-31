import { AbstractList } from '~/abstract-list';
import { ComparableList } from '~/comparable-list';
import { Addable, Comparable, Mergeable } from '~/interface';
import { MergeableList } from '~/mergeable-list';
import { NumberList } from '~/number-list';
import { StringList } from '~/string-list';

export class AddableList<T extends Addable<T>> extends AbstractList<T> {
  constructor(items: T[] = []) {
    super(items);
  }

  static from<T extends Addable<T>>(iterable: Iterable<T> | ArrayLike<T> = []): AddableList<T> {
    return new AddableList(Array.from(iterable));
  }

  static of<T extends Addable<T>>(...items: T[]): AddableList<T> {
    return new AddableList(items);
  }

  add(initialValue: T): T {
    return this.items.reduce((acc: T, cur: T): T => {
      if (!cur) {
        return acc;
      } else if (!this.isAddable(cur)) {
        throw new Error(`Cannot add non-addable item: ${JSON.stringify(cur)}`);
      }

      return acc.add(cur);
    }, initialValue);
  }

  distinctBy<K>(identifier: (item: T) => K): AddableList<T> {
    return AddableList.from(super.doDistinctBy(identifier));
  }

  filter(predicate: (value: T, index?: number, array?: T[]) => boolean): AddableList<T> {
    return new AddableList(this.items.filter(predicate));
  }

  flatMap<K extends Addable<K>>(mapper: (item: T, index?: number, array?: T[]) => K[]): AddableList<K> {
    return new AddableList(this.items.flatMap(mapper));
  }

  flattenToComparableList<K extends Comparable<K>>(mapper: (item: T) => K): ComparableList<K> {
    return new ComparableList(this.items.flatMap(item => mapper(item)));
  }

  flattenToMergeableList<K extends Mergeable<K>>(mapper: (item: T) => K): MergeableList<K> {
    return new MergeableList(this.items.flatMap(item => mapper(item)));
  }

  flattenToNumberList(mapper: (item: T) => number): NumberList {
    return new NumberList(this.items.flatMap(item => mapper(item)));
  }

  flattenToStringList(mapper: (item: T) => string): StringList {
    return new StringList(this.items.flatMap(item => mapper(item)));
  }

  map<K extends Addable<K>>(mapper: (value: T, index?: number, array?: T[]) => K): AddableList<K> {
    return new AddableList(this.items.map(mapper));
  }

  toComparableList<K extends Comparable<K>>(mapper: (item: T) => K): ComparableList<K> {
    return new ComparableList(this.items.map(item => mapper(item)));
  }

  toMergeableList<K extends Mergeable<K>>(mapper: (item: T) => K): MergeableList<K> {
    return new MergeableList(this.items.map(item => mapper(item)));
  }

  toNumberList(mapper: (item: T) => number): NumberList {
    return new NumberList(this.items.map(item => mapper(item)));
  }

  toStringList(mapper: (item: T) => string): StringList {
    return new StringList(this.items.map(item => mapper(item)));
  }

  private isAddable(object: any): object is Addable<T> {
    return 'add' in object;
  }
}
