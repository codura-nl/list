export abstract class AbstractList<T> {
  protected constructor(protected readonly items: T[] = []) {
  }

  every(predicate: (item: T, index?: number, array?: T[]) => boolean): boolean {
    return this.items.every(predicate);
  }

  groupBy<K>(identifier: (item: T) => K): Map<K, T[]>;

  groupBy<K, L>(identifier: (item: T) => K, mapper: (item: T) => L): Map<K, L[]>;

  groupBy<K, L>(identifier: (item: T) => K, mapper?: (item: T) => L): Map<K, T[] | L[]> {
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

  mapBy<K>(identifier: (item: T) => K): Map<K, T>;

  mapBy<K, L>(identifier: (item: T) => K, mapper: (item: T) => L): Map<K, L>;

  mapBy<K, L>(identifier: (item: T) => K, mapper?: (item: T) => L): Map<K, T | L> {
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

  nonNullable<T>(value: T): value is NonNullable<T> {
    return value !== null && value !== undefined;
  }

  reduce<K>(reducer: (acc: K, cur: T, index?: number, array?: T[]) => K, initialValue: K): K {
    return this.items.reduce(reducer, initialValue);
  }

  some(predicate: (item: T, index?: number, array?: T[]) => boolean): boolean {
    return this.items.some(predicate);
  }

  toArray(): T[] {
    return this.items;
  }

  protected doDistinct(): Iterable<T> {
    const set = new Set(this.items);

    return set.values();
  }

  protected doDistinctBy<K, L>(identifier: (item: T) => K, mapper?: (item: T) => L): Iterable<T | L> {
    if (!mapper) {
      const map = this.reduce((acc: Map<K, T>, cur: T) => {
        const key = identifier(cur);

        if (!acc.has(key)) {
          acc.set(key, cur);
        }

        return acc;
      }, new Map<K, T>());

      return map.values();
    }

    const map = this.reduce((acc: Map<K, L>, cur: T) => {
      const key = identifier(cur);

      if (!acc.has(key)) {
        acc.set(key, mapper(cur));
      }

      return acc;
    }, new Map<K, L>());

    return map.values();
  }
}
