import { describe, expect, it } from 'vitest';
import { Flattenable, FlattenableList } from '../src';

class MockFlattenable implements Flattenable<MockFlattenable> {
  constructor(private readonly value: string) {
  }

  flatten(other: MockFlattenable): MockFlattenable {
    return new MockFlattenable([this.value, other.value].join(''));
  }
}

describe('FlattenableList', () => {
  it('should create a FlattenableList with the static of method', () => {
    const list = FlattenableList.of(new MockFlattenable('a'), new MockFlattenable('b'));
    expect(list.toArray().length).toBe(2);
  });
});
