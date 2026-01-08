// You will be given an array a and a value x. All you need to do is check whether the provided array contains the value.

// a can contain numbers or strings. x can be either.

// Return true if the array contains the value, false if not.


export const isIncluded = (a: unknown[], x: unknown): boolean => {
  return a.includes(x);
  // includes automatically converts to boolean
}
