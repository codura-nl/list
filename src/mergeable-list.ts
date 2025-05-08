import { AbstractList } from '~/abstract-list';
import { AddableList } from '~/addable-list';
import { ComparableList } from '~/comparable-list';
import { Addable, Comparable, Mergeable } from '~/interface';
import { NumberList } from '~/number-list';
import { StringList } from '~/string-list';
import { Distinct } from '~/util/distinct';
import { Empty } from '~/util/empty';
import { Shuffle } from '~/util/shuffle';

export class MergeableList<T extends Mergeable<T>> extends AbstractList<T> {
  constructor(items?: T[]) {
    super(items);
  }

  static from<T extends Mergeable<T>>(iterable?: Iterable<T> | ArrayLike<T>): MergeableList<T> {
    return new MergeableList(Array.from(iterable ?? []));
  }

  static of<T extends Mergeable<T>>(...items: T[]): MergeableList<T> {
    return new MergeableList(items);
  }

  concat(items?: ConcatArray<T>): MergeableList<T> {
    if (!items) {
      return this;
    }

    return new MergeableList(this.items.concat(items));
  }

  distinctBy<K>(identifier: (item: T) => K): MergeableList<T> {
    return MergeableList.from(Distinct.distinctBy(this.items, identifier));
  }

  filter(predicate: (value: T, index?: number, array?: T[]) => boolean): MergeableList<T> {
    return new MergeableList(this.items.filter(predicate));
  }

  filterEmpty(): MergeableList<NonNullable<T>>;
  filterEmpty<K>(value: (value: T) => K): MergeableList<NonNullable<T>>;
  filterEmpty<K>(value?: (value: T) => K): MergeableList<NonNullable<T>> {
    return new MergeableList(Empty.filter(this.items, value));
  }

  flatMap<K extends Mergeable<K>>(mapper: (item: T, index?: number, array?: T[]) => K[]): MergeableList<K> {
    return new MergeableList(this.items.flatMap(mapper));
  }

  flattenToAddableList<K extends Addable<K>>(mapper: (item: T) => K[]): AddableList<K> {
    return new AddableList(this.items.flatMap(item => mapper(item)));
  }

  flattenToComparableList<K extends Comparable<K>>(mapper: (item: T) => K[]): ComparableList<K> {
    return new ComparableList(this.items.flatMap(item => mapper(item)));
  }

  flattenToNumberList(mapper: (item: T) => number[]): NumberList {
    return new NumberList(this.items.flatMap(item => mapper(item)));
  }

  flattenToStringList(mapper: (item: T) => string[]): StringList {
    return new StringList(this.items.flatMap(item => mapper(item)));
  }

  map<K extends Mergeable<K>>(mapper: (value: T, index?: number, array?: T[]) => K): MergeableList<K> {
    return new MergeableList(this.items.map(mapper));
  }

  mergeBy<K>(identifier: (item: T) => K): MergeableList<T> {
    const items = this.items.reduce((acc: T[], cur: T) => {
      if (!this.isMergeable(cur)) {
        throw new Error(`Cannot merge non-mergeable item: ${JSON.stringify(cur)}`);
      }

      const index = acc.findIndex((item: T) => identifier(cur) === identifier(item));

      if (index >= 0) {
        acc.splice(index, 1, acc[index].merge(cur));
      } else {
        acc.push(cur);
      }

      return acc;
    }, new Array<T>());

    return new MergeableList(items);
  }

  shuffle(): MergeableList<T> {
    return new MergeableList(Shuffle.shuffle(this.items));
  }

  toAddableList<K extends Addable<K>>(mapper: (item: T) => K): AddableList<K> {
    return new AddableList(this.items.map(item => mapper(item)));
  }

  toComparableList<K extends Comparable<K>>(mapper: (item: T) => K): ComparableList<K> {
    return new ComparableList(this.items.map(item => mapper(item)));
  }

  toNumberList(mapper: (item: T) => number): NumberList {
    return new NumberList(this.items.map(item => mapper(item)));
  }

  toSorted(compareFn: (a: T, b: T) => number): MergeableList<T> {
    return new MergeableList(this.items.toSorted(compareFn));
  }

  toStringList(mapper: (item: T) => string): StringList {
    return new StringList(this.items.map(item => mapper(item)));
  }

  private isMergeable(object: any): object is Mergeable<T> {
    return 'merge' in object;
  }
}
