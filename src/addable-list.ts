import { AbstractList } from '~/abstract-list';
import { Addable } from '~/interface';

export class AddableList<T extends Addable> extends AbstractList<T> {
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

  private isAddable(object: any): object is Addable {
    return 'add' in object;
  }
}
