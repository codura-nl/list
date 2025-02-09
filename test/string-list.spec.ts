import { describe, expect, it } from 'vitest';
import { StringList } from '../src';

describe('StringList', () => {
  it('should join items with a separator', () => {
    const list = StringList.of('a', 'b', 'c');

    expect(list.join(',')).toBe('a,b,c');
  });

  it('should map items to uppercase', () => {
    const list = StringList.of('a', 'b', 'c');
    const upperList = list.map(item => item.toUpperCase());

    expect(upperList.toArray()).toEqual(['A', 'B', 'C']);
  });
});
