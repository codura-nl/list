export abstract class AbstractList<T> {
  protected constructor(protected readonly items: T[] = []) {
  }

  get value(): T[] {
    return this.items;
  }

  groupBy<K, L>(identifier: (item: T) => K, mapper?: (item: T) => L): Map<K, T[] | L[]> {
    if (!mapper) {
      return this.items.reduce((acc: Map<K, T[]>, cur: T) => {
        const key = identifier(cur);

        if (!acc.has(key)) {
          acc.set(key, [cur]);
        } else {
          acc.get(key)!.push(cur);
        }

        return acc;
      }, new Map<K, T[]>());
    }

    return this.items.reduce((acc: Map<K, L[]>, cur: T) => {
      const key = identifier(cur);

      if (!acc.has(key)) {
        acc.set(key, [mapper(cur)]);
      } else {
        acc.get(key)!.push(mapper(cur));
      }

      return acc;
    }, new Map<K, L[]>());
  }

  mapBy<K, L>(identifier: (item: T) => K, mapper?: (item: T) => L): Map<K, T | L> {
    if (!mapper) {
      return this.items.reduce((store: Map<K, T>, item: T) => {
        const key = identifier(item);

        store.set(key, item);

        return store;
      }, new Map<K, T>());
    }

    return this.items.reduce((store: Map<K, L>, item: T) => {
      const key = identifier(item);

      store.set(key, mapper(item));

      return store;
    }, new Map<K, L>());
  }

  toArray(): T[] {
    return this.items;
  }
}
