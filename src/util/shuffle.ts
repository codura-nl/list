export class Shuffle {
  static shuffle<T>(items: T[]): T[] {
    return items.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }
}
