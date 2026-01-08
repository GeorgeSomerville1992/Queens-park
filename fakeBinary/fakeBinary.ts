// Given a string of digits, you should replace any digit below 5 with '0' and any digit 5 and above with '1'. Return the resulting string.

// Note: input will never be an empty string
// never an empty string...
const fakeBinary = (s: string): string => {
  const splitString = s.split('');
  // split into array of different charters

  const binaryArray = splitString.map((char) => {
    if(parseInt(char) < 5){
      return '0';
    } else {
      return '1';
    }
  });
  return binaryArray.join('');
}


function maps(x){
 return x.map(n => n * 2);
}
