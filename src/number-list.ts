import { AbstractList } from '~/abstract-list';
import { AddableList } from '~/addable-list';
import { ComparableList } from '~/comparable-list';
import { Addable, Comparable, Mergeable } from '~/interface';
import { MergeableList } from '~/mergeable-list';
import { StringList } from '~/string-list';

export class NumberList extends AbstractList<number> {
  constructor(items: number[] = []) {
    super(items);
  }

  static from(iterable: Iterable<number> | ArrayLike<number> = []): NumberList {
    return new NumberList(Array.from(iterable));
  }

  static of(...items: number[]): NumberList {
    return new NumberList(items);
  }

  distinct(): NumberList {
    return NumberList.from(super.doDistinct());
  }

  filter(predicate: (value: number, index?: number, array?: number[]) => boolean): NumberList {
    return new NumberList(this.items.filter(predicate));
  }

  filterEmpty(): NumberList {
    return new NumberList(this.items.filter(this.nonNullable));
  }

  flatMap(mapper: (item: number, index?: number, array?: number[]) => number[]): NumberList {
    [1, 2].flatMap((item) => [item, item + 1]);

    return new NumberList(this.items.flatMap(mapper));
  }

  flattenToAddableList<K extends Addable<K>>(mapper: (item: number) => K[]): AddableList<K> {
    return new AddableList(this.items.flatMap(item => mapper(item)));
  }

  flattenToComparableList<K extends Comparable<K>>(mapper: (item: number) => K[]): ComparableList<K> {
    return new ComparableList(this.items.flatMap(item => mapper(item)));
  }

  flattenToMergeableList<K extends Mergeable<K>>(mapper: (item: number) => K[]): MergeableList<K> {
    return new MergeableList(this.items.flatMap(item => mapper(item)));
  }

  flattenToStringList(mapper: (item: number) => string[]): StringList {
    return new StringList(this.items.flatMap(item => mapper(item)));
  }

  map(mapper: (value: number, index?: number, array?: number[]) => number): NumberList {
    return new NumberList(this.items.map(mapper));
  }

  /**
   * Returns the maximum value in the list.
   */
  max(): number {
    return Math.max(...this.items);
  }

  /**
   * Returns the minimum value in the list.
   */
  min(): number {
    return Math.min(...this.items);
  }

  /**
   * Subtracts all items in the list from the initialValue.
   *
   * @param initialValue
   */
  sub(initialValue: number = 0): number {
    return this.items.reduce((acc: number, cur: number): number => acc - cur, initialValue);
  }

  /**
   * Add all items in the list to the initialValue.
   *
   * @param initialValue
   */
  sum(initialValue = 0): number {
    return this.items.reduce((acc: number, cur: number): number => acc + cur, initialValue);
  }

  toAddableList<K extends Addable<K>>(mapper: (item: number) => K): AddableList<K> {
    return new AddableList(this.items.map(item => mapper(item)));
  }

  toComparableList<K extends Comparable<K>>(mapper: (item: number) => K): ComparableList<K> {
    return new ComparableList(this.items.map(item => mapper(item)));
  }

  toMergeableList<K extends Mergeable<K>>(mapper: (item: number) => K): MergeableList<K> {
    return new MergeableList(this.items.map(item => mapper(item)));
  }

  toStringList(mapper: (item: number) => string): StringList {
    return new StringList(this.items.map(item => mapper(item)));
  }
}
