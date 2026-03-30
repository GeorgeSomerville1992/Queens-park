const IntegerContainerInterface = require('./integerContainerInterface');

class IntegerContainer extends IntegerContainerInterface {
  constructor() {
    super();
    this.container = []
    // TODO: implement
  }

  // TODO: implement interface methods here
  
  add(value) {
    this.container.push(value);
    return this.container.length;
  }
  
  delete(value) {
    const foundValue = this.container.find((containerValue) => containerValue === value);
    
    if(foundValue) {
      this.container.splice(this.container.indexOf(foundValue), 1)
      return true;
    } else {
      return false;
    }
  }
  
  getMedian() {
    if(this.container.length < 1) {
      return null;
    }
    const sortedContainer = [...this.container].sort((a, b) => a - b);
    
    const isEven = sortedContainer.length % 2 === 0;
    const splitIndex = Math.floor(sortedContainer.length / 2);
    console.log('splitIndex', splitIndex)
    console.log('sortedContainer', sortedContainer);
    
    console.log('isEven?', isEven);
    const median = isEven ? sortedContainer[splitIndex - 1] : sortedContainer[splitIndex]
    
    console.log('median -->', median)
    return median;
  }
  
}

module.exports = IntegerContainer;
