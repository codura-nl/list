export class Sort {
  static sort<T>(items: T[], identifier: (item: T) => number | string, reverse = false): T[] {
    return items.toSorted((a, b) => {
      const aValue = identifier(reverse ? b : a);
      const bValue = identifier(reverse ? b : a);

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }

      return 0;
    });
  }
}
