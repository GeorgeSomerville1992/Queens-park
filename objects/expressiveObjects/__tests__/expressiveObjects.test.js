//  doTest(left,'add',right, -467.0083333333333);
//   doTest(left,'subtract',right, -282.9916666666667);
//   doTest(left,'multiply',right, 34503.125);
//   doTest(left,'divide',right, 4.075717779186667);
//   doTest(right,'subtract',left, 282.9916666666667);
//   doTest(right,'divide',left, 0.24535555555555558);

import { evaluate } from "../expressObjects";
import { describe, expect, test } from "@jest/globals";

describe("expressive Objects", () => {
	const left = {
		multiply: {
			add: [1, 2, 3, 4, 5],
			subtract: [5, 6, 7, 8, 9],
			multiply: [1, 2, 3, 4, 5],
			divide: [1, 2, 3, 4, 5],
		},
	};

	const right = {
		subtract: {
			add: [1, 2, 3, 4, 5],
			subtract: [1, 2, 3, 4, 5],
			multiply: [1, 2, 3, 4, 5],
			divide: [1, 2, 3, 4, 5],
		},
	};
	it("sample tests", () => {
		expect(evaluate(left, "add", right)).toEqual(-467.0083333333333);
		expect(evaluate(left, "multiply", right)).toEqual(34503.125);
		expect(evaluate(left, "divide", right)).toEqual(4.075717779186667);
		expect(evaluate(right, "subtract", left)).toEqual(282.9916666666667);
		expect(evaluate(right, "divide", left)).toEqual(0.24535555555555558);
	});
});

describe("shuffled order", () => {
	// ordering is off
	const left = {
		add: {
			add: [5, 10, 8, 10, 14, 9, 11, 11, 15, 13, 15, 11, 5, 13, 7],
			multiply: [7, 15, 13],
			subtract: [6, 15, 7, 13, 13, 6, 8, 15, 14, 7, 13, 10],
			divide: [15, 6, 7],
		},
	};

	op = "subtract";

	const right = {
		subtract: {
			multiply: [11, 12, 13, 15, 15],
			add: [11, 10, 14, 13, 7, 8],
			divide: [9, 7, 15, 9],
			subtract: [7, 6, 13, 13, 10, 11, 13, 15, 6, 15, 6, 6, 15],
		},
	};

	it("should handle edge cases", () => {
		expect(evaluate(left, op, right)).toEqual(387322.3666666667);
	});
});

// left = {
// 	divide: {
// 		multiply: [10, 13, 15],
// 		add: [13, 14, 11, 12, 11, 14, 6, 5, 9, 7, 8, 15, 5],
// 		divide: [11, 12, 10, 9, 11],
// 		subtract: [
// 			11, 13, 12, 9, 8, 6, 10, 10, 9, 5, 5, 7, 13, 8, 10, 11, 9, 10, 15, 12,
// 		],
// 	},
// };

// op = "add";

// right = {
// 	add: {
// 		multiply: [14, 9, 11, 13],
// 		add: [
// 			12, 5, 10, 8, 10, 9, 9, 6, 5, 6, 10, 7, 9, 6, 12, 8, 10, 7, 13, 11, 8,
// 		],
// 		divide: [5, 7, 13, 9],
// 		subtract: [7, 11, 8, 14, 9, 15, 13, 6, 11, 9, 10, 10],
// 	},
// };
