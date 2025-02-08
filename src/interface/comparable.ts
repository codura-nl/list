export interface Comparable {
  equals: <T extends Comparable>(item: T) => boolean;
}
