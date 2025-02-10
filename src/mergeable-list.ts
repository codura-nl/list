import { AbstractList } from '~/abstract-list';
import { AddableList } from '~/addable-list';
import { ComparableList } from '~/comparable-list';
import { FlattenableList } from '~/flattenable-list';
import { Addable, Comparable, Flattenable, Mergeable } from '~/interface';
import { NumberList } from '~/number-list';
import { StringList } from '~/string-list';

export class MergeableList<T extends Mergeable<T>> extends AbstractList<T> {
  constructor(items: T[] = []) {
    super(items);
  }

  static from<T extends Mergeable<T>>(iterable: Iterable<T> | ArrayLike<T> = []): MergeableList<T> {
    return new MergeableList(Array.from(iterable));
  }

  static of<T extends Mergeable<T>>(...items: T[]): MergeableList<T> {
    return new MergeableList(items);
  }

  distinctBy<K>(identifier: (item: T) => K): MergeableList<T> {
    return MergeableList.from(super.doDistinctBy(identifier));
  }

  filter(predicate: (value: T, index?: number, array?: T[]) => boolean): MergeableList<T> {
    return new MergeableList(this.items.filter(predicate));
  }

  flatMap<K extends Mergeable<K>>(mapper: (item: T, index?: number, array?: T[]) => K[]): MergeableList<K> {
    return new MergeableList(this.items.flatMap(mapper));
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

  toAddableList<K extends Addable<K>>(mapper: (item: T) => K): AddableList<K> {
    return new AddableList(this.items.map(item => mapper(item)));
  }

  toComparableList<K extends Comparable<K>>(mapper: (item: T) => K): ComparableList<K> {
    return new ComparableList(this.items.map(item => mapper(item)));
  }

  toFlattenableList<K extends Flattenable<K>>(mapper: (item: T) => K): FlattenableList<K> {
    return new FlattenableList(this.items.map(item => mapper(item)));
  }

  toNumberList(mapper: (item: T) => number): NumberList {
    return new NumberList(this.items.map(item => mapper(item)));
  }

  toStringList(mapper: (item: T) => string): StringList {
    return new StringList(this.items.map(item => mapper(item)));
  }

  private isMergeable(object: any): object is Mergeable<T> {
    return 'merge' in object;
  }
}
