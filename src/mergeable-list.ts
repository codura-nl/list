import { AbstractList } from '~/abstract-list';
import { Mergeable } from '~/interface';

export class MergeableList<T extends Mergeable> extends AbstractList<T> {
  static of<T extends Mergeable>(...items: T[]): MergeableList<T> {
    return new MergeableList(items);
  }

  mergeBy<K>(identifier: (item: T) => K): MergeableList<T> {
    const items = this.items.reduce((acc: T[], cur: T) => {
      if (!this.isMergeable(cur)) {
        throw new Error(`Cannot merge non-mergeable item: ${JSON.stringify(cur)}`);
      }

      const index = acc.findIndex((item: T) => identifier(cur) === identifier(item));

      if (index >= 0) {
        acc.splice(index, 1, acc[index].merge(cur));
      } else {
        acc.push(cur);
      }

      return acc;
    }, new Array<T>());

    return new MergeableList(items);
  }

  private isMergeable(object: any): object is Mergeable {
    return 'merge' in object;
  }
}
