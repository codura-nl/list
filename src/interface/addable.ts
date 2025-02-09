export interface Addable<T extends Addable<T>> {
  add: (item: T) => T;
}
