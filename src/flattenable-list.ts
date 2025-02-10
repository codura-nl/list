import { AbstractList } from '~/abstract-list';
import { AddableList } from '~/addable-list';
import { ComparableList } from '~/comparable-list';
import { Addable, Comparable, Flattenable, Mergeable } from '~/interface';
import { MergeableList } from '~/mergeable-list';
import { NumberList } from '~/number-list';
import { StringList } from '~/string-list';

export class FlattenableList<T extends Flattenable<T>> extends AbstractList<T> {
  constructor(items: T[] = []) {
    super(items);
  }

  static from<T extends Flattenable<T>>(iterable: Iterable<T> | ArrayLike<T> = []): FlattenableList<T> {
    return new FlattenableList(Array.from(iterable));
  }

  static of<T extends Flattenable<T>>(...items: T[]): FlattenableList<T> {
    return new FlattenableList(items);
  }

  distinctBy<K>(identifier: (item: T) => K): FlattenableList<T> {
    return FlattenableList.from(super.doDistinctBy(identifier));
  }

  filter(predicate: (value: T, index?: number, array?: T[]) => boolean): FlattenableList<T> {
    return new FlattenableList(this.items.filter(predicate));
  }

  flatMap<K extends Flattenable<K>>(mapper: (item: T, index?: number, array?: T[]) => K[]): FlattenableList<K> {
    return new FlattenableList(this.items.flatMap(mapper));
  }

  flattenBy<K>(identifier: (item: T) => K): FlattenableList<T> {
    const items = this.reduce((acc: T[], cur: T) => {
      if (!this.isFlattenable(cur)) {
        throw new Error(`Cannot flatten non-flattenable item: ${JSON.stringify(cur)}`);
      }

      const index = acc.findIndex((item: T) => identifier(cur) === identifier(item));

      if (index >= 0) {
        acc.splice(index, 1, acc[index].flatten(cur));
      } else {
        acc.push(cur);
      }

      return acc;
    }, new Array<T>());

    return new FlattenableList(items);
  }

  map<K extends Flattenable<K>>(mapper: (value: T, index?: number, array?: T[]) => K): FlattenableList<K> {
    return new FlattenableList(this.items.map(mapper));
  }

  toAddableList<K extends Addable<K>>(mapper: (item: T) => K): AddableList<K> {
    return new AddableList(this.items.map(item => mapper(item)));
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

  private isFlattenable(object: object): object is Flattenable<T> {
    return 'flatten' in object;
  }
}
