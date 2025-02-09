export interface Mergeable<T extends Mergeable<T>> {
  merge: (item: T) => T;
}
