import { AbstractList } from '~/abstract-list';
import { AddableList } from '~/addable-list';
import { ComparableList } from '~/comparable-list';
import { FlattenableList } from '~/flattenable-list';
import { Addable, Comparable, Flattenable, Mergeable } from '~/interface';
import { MergeableList } from '~/mergeable-list';
import { NumberList } from '~/number-list';
import { StringList } from '~/string-list';

export class List<T> extends AbstractList<T> {
  constructor(items: T[] = []) {
    super(items);
  }

  static from<T>(iterable: Iterable<T> | ArrayLike<T> = []): List<T> {
    return new List(Array.from(iterable));
  }

  static of<T>(...items: T[]): List<T> {
    return new List(items);
  }

  filter(predicate: (item: T, index?: number, array?: T[]) => boolean): List<T> {
    return new List(this.items.filter(predicate));
  }

  flatMap<K>(mapper: (item: T, index?: number, array?: T[]) => K[]): List<K> {
    return new List(this.items.flatMap(mapper));
  }

  map<K>(mapper: (item: T, index?: number, array?: T[]) => K): List<K> {
    return new List(this.items.map(mapper));
  }

  toAddableList<K extends Addable<K>>(mapper: (item: T) => K): AddableList<K> {
    return new AddableList(this.items.map(item => mapper(item)));
  }

  toComparableList<K extends Comparable<K>>(mapper: (item: T) => K): ComparableList<K> {
    return new ComparableList(this.items.map(item => mapper(item)));
  }

  toFlattenableList<K extends Flattenable<K>>(mapper: (item: T) => K): FlattenableList<K> {
    return new FlattenableList(this.items.map(item => mapper(item)));
  }

  toMergeableList<K extends Mergeable<K>>(mapper: (item: T) => K): MergeableList<K> {
    return new MergeableList(this.items.map(item => mapper(item)));
  }

  toNumberList(mapper: (item: T) => number): NumberList {
    return new NumberList(this.items.map(item => mapper(item)));
  }

  toStringList(mapper: (item: T) => string): StringList {
    return new StringList(this.items.map(item => mapper(item)));
  }
}
