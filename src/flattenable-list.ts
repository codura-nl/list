import { AbstractList } from '~/abstract-list';
import { Flattenable } from '~/interface';

export class FlattenableList<T extends Flattenable> extends AbstractList<T> {
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

  private isFlattenable(object: object): object is Flattenable {
    return 'flatten' in object;
  }
}
