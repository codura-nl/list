export interface Flattenable {
  flatten: <T extends Flattenable>(item: T) => T;
}
