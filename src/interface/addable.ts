export interface Addable {
  add: <T extends Addable>(item: T) => T;
}
