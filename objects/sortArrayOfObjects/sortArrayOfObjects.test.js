// [
//   {"a": 1, "b": 3},
//   {"a": 3, "b": 2},
//   {"a": 2, "b": 40},
//   {"a": 4, "b": 12}
// ]


// [
//   {"a": 4, "b": 12},
//   {"a": 3, "b": 2},
//   {"a": 2, "b": 40},
//   {"a": 1, "b": 3}
// ]

import { sortArrayOfObjects } from './sortArrayOfObject';

describe('Sort array', () => {
  it.only('should sort the list correctly', () => {
    let sortBy = "b";
    let arr = [
          { a: 2, b: 2 },
          { a: 3, b: 40 },
          { a: 1, b: 12 }
        ];
    let expected = [
          { a: 3, b: 40 },
          { a: 1, b: 12 },
          { a: 2, b: 2 }
        ];
      expect(sortArrayOfObjects(sortBy, arr)).toEqual(expected);
  });
});