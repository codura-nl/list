export interface Comparable<T extends Comparable<T>> {
  equals: (item: T) => boolean;
}
