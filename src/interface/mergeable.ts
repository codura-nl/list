export interface Mergeable {
  merge: <T extends Mergeable>(item: T) => T;
}
