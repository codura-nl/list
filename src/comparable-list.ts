import { AbstractList } from '~/abstract-list';
import { AddableList } from '~/addable-list';
import { FlattenableList } from '~/flattenable-list';
import { Addable, Comparable, Flattenable, Mergeable } from '~/interface';
import { MergeableList } from '~/mergeable-list';
import { NumberList } from '~/number-list';
import { StringList } from '~/string-list';

export class ComparableList<T extends Comparable> extends AbstractList<T> {
  constructor(items?: T[]) {
    super(items);
  }

  static of<T extends Comparable>(...items: T[]): ComparableList<T> {
    return new ComparableList(items);
  }

  equals(items: T[] = []): boolean {
    if (!items.length) {
      return !this.items.length; // If both empty, they are equal
    }

    [...this.items, ...items].forEach((item: T) => {
      if (!this.isComparable(item)) {
        throw new Error(`Cannot compare non-comparable item: ${JSON.stringify(item)}`);
      }
    });

    return (
      this.items.length === items.length &&
      this.items.every((localItem: T) => items.some((item: T) => item.equals(localItem))) &&
      items.every(item => this.items.some((localItem: T) => localItem.equals(item)))
    );
  }

  filter(predicate: (value: T, index?: number, array?: T[]) => boolean): ComparableList<T> {
    return new ComparableList(this.items.filter(predicate));
  }

  map(mapper: (value: T, index?: number, array?: T[]) => T): ComparableList<T> {
    return new ComparableList(this.items.map(mapper));
  }

  toAddableList<K extends Addable>(mapper: (item: T) => K): AddableList<K> {
    return new AddableList(this.items.map(item => mapper(item)));
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

  private isComparable(object: any): object is Comparable {
    return 'equals' in object;
  }
}
