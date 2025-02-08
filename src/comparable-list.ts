import { Comparable } from '~/interface';
import { List } from '~/list';

export class ComparableList<T extends Comparable> extends List<T> {
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

  private isComparable(object: any): object is Comparable {
    return 'equals' in object;
  }
}
