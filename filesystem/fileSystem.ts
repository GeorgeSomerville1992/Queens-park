/**
 * A container of integers that should support
 * addition, removal, and search for the median integer
 */
class Container {
  constructor() {
    this.integers = [];
  }

  /**
   * Adds the specified value to the container
   *
   * @param {number} value
   */
  add(value) {
    // TODO: implement this method
    this.integers.push(value);
  }

  /**
   * Attempts to delete one item of the specified value from the container
   *
   * @param {number} value
   * @return {boolean} true, if the value has been deleted, or
   *                   false, otherwise.
   */
  delete(value) {
    // TODO: implement this method
    // console.log('integers', this.integers);
    // console.log('did we find one?', this.integers.find((integer) => { return integer === value}))
    
    const foundForDelete = this.integers.find((integer) => { return integer === value})
    
    if(foundForDelete) {
      // this.integers.indexOf(foundForDelete), 1
      this.integers.splice(this.integers.indexOf(foundForDelete), 1)
      return true;
    }
    return false;
  }

  /**
   * Finds the container's median integer value, which is
   * the middle integer when the all integers are sorted in order.
   * If the sorted array has an even length,
   * the leftmost integer between the two middle
   * integers should be considered as the median.
   *
   * @return {number} the median if the array is not empty, or
   * @throws {Error} a runtime exception, otherwise.
   */
  getMedian() {
    // TODO: implement this method
    if(!this.integers.length > 0) {
      throw new Error
    }

    const sortedIntegers = [...this.integers].sort((a, b) => a - b);
    const sortedSplit = Math.floor(sortedIntegers.length / 2);
    
    const medium = sortedIntegers.length % 2 === 0 ? sortedIntegers[sortedSplit - 1] : sortedIntegers[sortedSplit];
    
    return medium;
  }

}

module.exports = Container;
