import { AddableList } from '~/addable-list';
import { ComparableList } from '~/comparable-list';
import { FlattenableList } from '~/flattenable-list';
import { Addable, Comparable, Flattenable, Mergeable } from '~/interface';
import { MergeableList } from '~/mergeable-list';
import { NumberList } from '~/number-list';
import { StringList } from '~/string-list';

export abstract class AbstractList<T> {
  protected constructor(protected readonly items: T[] = []) {
  }

  groupBy<K, L>(identifier: (item: T) => K, mapper?: (item: T) => L): Map<K, T[] | L[]> {
    if (!mapper) {
      return this.items.reduce((acc: Map<K, T[]>, cur: T) => {
        const key = identifier(cur);

        if (!acc.has(key)) {
          acc.set(key, [cur]);
        } else {
          acc.get(key)!.push(cur);
        }

        return acc;
      }, new Map<K, T[]>());
    }

    return this.items.reduce((acc: Map<K, L[]>, cur: T) => {
      const key = identifier(cur);

      if (!acc.has(key)) {
        acc.set(key, [mapper(cur)]);
      } else {
        acc.get(key)!.push(mapper(cur));
      }

      return acc;
    }, new Map<K, L[]>());
  }

  mapBy<K, L>(identifier: (item: T) => K, mapper?: (item: T) => L): Map<K, T | L> {
    if (!mapper) {
      return this.items.reduce((store: Map<K, T>, item: T) => {
        const key = identifier(item);

        store.set(key, item);

        return store;
      }, new Map<K, T>());
    }

    return this.items.reduce((store: Map<K, L>, item: T) => {
      const key = identifier(item);

      store.set(key, mapper(item));

      return store;
    }, new Map<K, L>());
  }

  toArray(): T[] {
    return this.items;
  }

  toAddableList<K extends Addable>(mapper: (item: T) => K): AddableList<K> {
    return new AddableList(this.items.map(item => mapper(item)));
  }

  toComparableList<K extends Comparable>(mapper: (item: T) => K): ComparableList<K> {
    return new ComparableList(this.items.map(item => mapper(item)));
  }

  toFlattenableList<K extends Flattenable>(mapper: (item: T) => K): FlattenableList<K> {
    return new FlattenableList(this.items.map(item => mapper(item)));
  }

  toMergeableList<K extends Mergeable>(mapper: (item: T) => K): MergeableList<K> {
    return new MergeableList(this.items.map(item => mapper(item)));
  }

  toNumberList(mapper: (item: T) => number): NumberList {
    return new NumberList(this.items.map(item => mapper(item)));
  }

  toStringList(mapper: (item: T) => string): StringList {
    return new StringList(this.items.map(item => mapper(item)));
  }
}
