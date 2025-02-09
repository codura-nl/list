import { AbstractList } from '~/abstract-list';

export class List<T> extends AbstractList<T> {
  static of<T>(...items: T[]): List<T> {
    return new List(items);
  }

  filter(predicate: (item: T) => boolean): List<T> {
    return new List(this.items.filter(predicate));
  }

  map<K>(mapper: (item: T) => K): List<K> {
    return new List(this.items.map(mapper));
  }

  reduce<K>(reducer: (acc: K, cur: T) => K, initialValue: K): K {
    return this.items.reduce(reducer, initialValue);
  }
}
