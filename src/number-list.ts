import { AbstractList } from '~/abstract-list';

export class NumberList extends AbstractList<number> {
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
}
