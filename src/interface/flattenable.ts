export interface Flattenable<T extends Flattenable<T>> {
  flatten: (item: T) => T;
}
