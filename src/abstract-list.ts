export abstract class AbstractList<T> {
  protected constructor(protected readonly items: T[] = []) {
  }

  distinctBy<K, L = T>(identifier: (item: T) => K, mapper?: (item: T) => L): Array<T | L> {
    if (!mapper) {
      const map = this.reduce((store: Map<K, T>, item: T) => {
        const key = identifier(item);

        if (!store.has(key)) {
          store.set(key, item);
        }

        return store;
      }, new Map<K, T>());

      return Array.from(map.values());
    }

    const map = this.reduce((store: Map<K, L>, item: T) => {
      const key = identifier(item);

      if (!store.has(key)) {
        store.set(key, mapper(item));
      }

      return store;
    }, new Map<K, L>());

    return Array.from(map.values());
  }

  groupBy<K, L = T>(identifier: (item: T) => K, mapper: (item?: T) => L): Map<K, T[] | L[]> {
    if (!mapper) {
      return this.reduce((acc: Map<K, T[]>, cur: T) => {
        const key = identifier(cur);

        if (!acc.has(key)) {
          acc.set(key, [cur]);
        } else {
          acc.get(key)!.push(cur);
        }

        return acc;
      }, new Map<K, T[]>());
    }

    return this.reduce((acc: Map<K, L[]>, cur: T) => {
      const key = identifier(cur);

      if (!acc.has(key)) {
        acc.set(key, [mapper(cur)]);
      } else {
        acc.get(key)!.push(mapper(cur));
      }

      return acc;
    }, new Map<K, L[]>());
  }

  mapBy<K, L = T>(identifier: (item: T) => K, mapper?: (item: T) => L): Map<K, T | L> {
    if (!mapper) {
      return this.reduce((acc: Map<K, T>, cur: T) => {
        const key = identifier(cur);

        acc.set(key, cur);

        return acc;
      }, new Map<K, T>());
    }

    return this.reduce((acc: Map<K, L>, cur: T) => {
      const key = identifier(cur);

      acc.set(key, mapper(cur));

      return acc;
    }, new Map<K, L>());
  }

  reduce<K>(reducer: (acc: K, cur: T, index?: number, array?: T[]) => K, initialValue: K): K {
    return this.items.reduce(reducer, initialValue);
  }

  toArray(): T[] {
    return this.items;
  }
}
