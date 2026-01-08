
// You get an array of numbers, return the sum of all of the positives ones.
// more elegant solution:
// arr.reduce((a,b)=> a + (b > 0 ? b : 0),0);

export const positiveSum = (arr) => {
  return arr.reduce((sum, num) => (num > 0 ? sum + num : sum), 0);
}