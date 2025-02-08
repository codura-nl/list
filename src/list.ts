import { AbstractList } from '~/abstract-list';

export class List<T> extends AbstractList<T> {
  static of<T>(...items: T[]): List<T> {
    return new List(items);
  }

  map<K>(mapper: (item: T) => K): List<K> {
    return new List(this.items.map(mapper));
  }
}
