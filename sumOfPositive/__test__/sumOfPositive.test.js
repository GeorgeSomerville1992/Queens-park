import { positiveSum } from "../sumOfPositive.js";

describe.only("Basic tests", () => {
  it.only("Testing for fixed tests", () => {

    expect(positiveSum([1,2,3,4,5])).toBe(15);
    expect(positiveSum([1,-2,3,4,5])).toBe(13);
    expect(positiveSum([])).toBe(0);
    expect(positiveSum([-1,-2,-3,-4,-5])).toBe(0);
    expect(positiveSum([-1,2,3,4,-5])).toBe(9);
  });
});