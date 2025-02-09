import { AbstractList } from '~/abstract-list';
import { ComparableList } from '~/comparable-list';
import { FlattenableList } from '~/flattenable-list';
import { Addable, Comparable, Flattenable, Mergeable } from '~/interface';
import { MergeableList } from '~/mergeable-list';
import { NumberList } from '~/number-list';
import { StringList } from '~/string-list';

export class AddableList<T extends Addable> extends AbstractList<T> {
  constructor(items?: T[]) {
    super(items);
  }

  static of<T extends Addable>(...items: T[]): AddableList<T> {
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

  map(mapper: (item: T) => T): AddableList<T> {
    return new AddableList(this.items.map(mapper));
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

  private isAddable(object: any): object is Addable {
    return 'add' in object;
  }
}
