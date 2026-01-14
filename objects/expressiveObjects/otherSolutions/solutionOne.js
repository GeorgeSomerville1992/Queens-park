// cleaner elegent solution using reduce and forEach

const evaluate = (left, op, right) =>
	evaluateOperation(op, [computeResult(left), computeResult(right)]);

const evaluateOperation = (operation, array) =>
	array.reduce((a, b) => {
		switch (operation) {
			case "add":
				return a + b;
			case "subtract":
				return a - b;
			case "multiply":
				return a * b;
			case "divide":
				return a / b;
		}
	});

function computeResult(object) {
	for (var operation in object) {
		var result = [];
		["add", "subtract", "multiply", "divide"].forEach((op) =>
			result.push(evaluateOperation(op, object[operation][op])),
		);
		return evaluateOperation(operation, result);
	}
}
// Best Practices3Clever1
//  0ForkCompare with your solutionLink
