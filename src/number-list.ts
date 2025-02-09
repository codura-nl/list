import { AbstractList } from '~/abstract-list';
import { AddableList } from '~/addable-list';
import { ComparableList } from '~/comparable-list';
import { FlattenableList } from '~/flattenable-list';
import { Addable, Comparable, Flattenable, Mergeable } from '~/interface';
import { MergeableList } from '~/mergeable-list';
import { StringList } from '~/string-list';

export class NumberList extends AbstractList<number> {
  constructor(items?: number[]) {
    super(items);
  }

  static of(...items: number[]): NumberList {
    return new NumberList(items);
  }

  map(mapper: (item: number) => number): NumberList {
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

  toAddableList<K extends Addable>(mapper: (item: number) => K): AddableList<K> {
    return new AddableList(this.items.map(item => mapper(item)));
  }

  toComparableList<K extends Comparable>(mapper: (item: number) => K): ComparableList<K> {
    return new ComparableList(this.items.map(item => mapper(item)));
  }

  toFlattenableList<K extends Flattenable>(mapper: (item: number) => K): FlattenableList<K> {
    return new FlattenableList(this.items.map(item => mapper(item)));
  }

  toMergeableList<K extends Mergeable>(mapper: (item: number) => K): MergeableList<K> {
    return new MergeableList(this.items.map(item => mapper(item)));
  }

  toStringList(mapper: (item: number) => string): StringList {
    return new StringList(this.items.map(item => mapper(item)));
  }
}
