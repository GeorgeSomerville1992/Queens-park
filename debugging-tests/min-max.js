// Given a sorted array of integers a, your task is to determine which element of a is closest to all other values of a. In other words, find the element x in a, which minimizes the following sum:

// abs(a[0] - x) + abs(a[1] - x) + ... + abs(a[a.length - 1] - x)

// [2, 4, 7]
function solution(a) {
	var indexOfMinimum = -1;
	var minimalSum = Number.MAX_VALUE;

	for (var i = 0; i < a.length; i++) {
		var sum = 0;

		for (var j = 0; j < a.length; j++) {
			//
			sum += Math.abs(a[j] - a[i]);
			// the bug was here a[j] - a[j]
			// console.log('sum -->', sum);
		}

		if (sum < minimalSum) {
			minimalSum = sum;
			indexOfMinimum = i;
		}
	}

	return a[indexOfMinimum];
}

// return value us 2
// expected is 4

// For a = [2, 4, 7], the output should be solution(a) = 4.

// for x = 2, the value will be abs(2 - 2) + abs(4 - 2) + abs(7 - 2) = 7.
// for x = 4, the value will be abs(2 - 4) + abs(4 - 4) + abs(7 - 4) = 5.
// for x = 7, the value will be abs(2 - 7) + abs(4 - 7) + abs(7 - 7) = 8.
// The lowest possible value is when x = 4, so the answer is 4.

// For a = [2, 3], the output should be solution(a) = 2.

// for x = 2, the value will be abs(2 - 2) + abs(3 - 2) = 1.
// for x = 3, the value will be abs(2 - 3) + abs(3 - 3) = 1.
// Because there is a tie, the smallest x between x = 2 and x = 3
