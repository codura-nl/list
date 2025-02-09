import { AbstractList } from '~/abstract-list';
import { AddableList } from '~/addable-list';
import { ComparableList } from '~/comparable-list';
import { Addable, Comparable, Flattenable, Mergeable } from '~/interface';
import { MergeableList } from '~/mergeable-list';
import { NumberList } from '~/number-list';
import { StringList } from '~/string-list';

export class FlattenableList<T extends Flattenable> extends AbstractList<T> {
  constructor(items?: T[]) {
    super(items);
  }

  static of<T extends Flattenable>(...items: T[]): FlattenableList<T> {
    return new FlattenableList(items);
  }

  flattenBy<K>(identifier: (item: T) => K): FlattenableList<T> {
    const items = this.items.reduce((acc: T[], cur: T) => {
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

  map(mapper: (item: T) => T): FlattenableList<T> {
    return new FlattenableList(this.items.map(mapper));
  }

  toAddableList<K extends Addable>(mapper: (item: T) => K): AddableList<K> {
    return new AddableList(this.items.map(item => mapper(item)));
  }

  toComparableList<K extends Comparable>(mapper: (item: T) => K): ComparableList<K> {
    return new ComparableList(this.items.map(item => mapper(item)));
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

  private isFlattenable(object: object): object is Flattenable {
    return 'flatten' in object;
  }
}
