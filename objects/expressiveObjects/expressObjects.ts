// function evaluate(left, op, right)

// that given two operands (left and right) and an operator (op), will evaluate and return the result.

const left = {
	multiply: {
		add: [1, 2, 3, 4, 5],
		subtract: [5, 6, 7, 8, 9],
		multiply: [1, 2, 3, 4, 5],
		divide: [1, 2, 3, 4, 5],
	},
};
// You will reduce each array based on its key. So you will start of with add(ing) [1,2,3,4,5] => 15

// then subtract(ing) [5, 6, 7, 8, 9] => -25 etc. Once all arrays have been reduced, you will perform the
// root key operation on all the reduced arrays. So in this case, you will multiply each reduced array with
// each other. The order is ALWAYS value of 'add' key first, then 'subtract', then 'multiply' and finally
// 'divide'.

const right = {
	subtract: {
		add: [1, 2, 3, 4, 5],
		subtract: [1, 2, 3, 4, 5],
		multiply: [1, 2, 3, 4, 5],
		divide: [1, 2, 3, 4, 5],
	},
};

const sumValues = (entry) => {
	const [operation, values] = entry;
	// console.log("Operation:", operation);
	// console.log("values:", values);
	switch (operation) {
		case "add":
			return values.reduce((acc, val) => acc + val);
		case "subtract":
			return values.reduce((acc, val) => acc - val);
		case "multiply":
			return values.reduce((acc, val) => acc * val);
		case "divide":
			return values.reduce((acc, val) => acc / val);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
};

const sumRootValues = <T extends number>(acc: T, val: T, operation) => {
	switch (operation) {
		case "add":
			return acc + val;
		case "subtract":
			return acc - val;
		case "multiply":
			return acc * val;
		case "divide":
			return acc / val;
		default:
			throw new Error(`Unknown root operation: ${operation}`);
	}
};

const sortOrder = <T> (a: T, b: T) => {
	console.log("wooot", a, b);
	// a[0], b[0]
	const order = ["add", "subtract", "multiply", "divide"];

	return order.indexOf(a[0]) - order.indexOf(b[0]);
};

export const evaluate = (leftOperand, rootOperation, rightOperand) => {
	// order is ALWAYS add, subtract, multiply, divide
	const leftRootOperation = Object.keys(leftOperand)[0];
	const rightRootOperation = Object.keys(rightOperand)[0];

	const leftEntities = Object.entries(leftOperand[leftRootOperation]);
	const rightEntities = Object.entries(rightOperand[rightRootOperation]);

	console.log("Left Entities:", leftEntities);
	console.log("leftWEntitries sorted", leftEntities.sort(sortOrder));
	const leftEntitiesReduced = leftEntities.sort(sortOrder).map((entry) => {
		return sumValues(entry);
	});
	const rightEntitiesReduced = rightEntities.sort(sortOrder).map((entry) => {
		return sumValues(entry);
	});

	console.log("Left Entities Reduced:", leftEntitiesReduced);
	// can tek this out of a reduce. No need...
	const leftEntitiesReducedByRoot = leftEntitiesReduced.reduce((acc, val) => {
		console.log("leftRootOperation:", leftRootOperation);
		return sumRootValues(acc, val, leftRootOperation);
	});

	console.log("Left Entities Reduced by Root:", leftEntitiesReducedByRoot);
	const rightEntitiesReducedByRoot = rightEntitiesReduced.reduce((acc, val) => {
		console.log("rightRootOperation:", rightRootOperation);
		return sumRootValues(acc, val, rightRootOperation);
	});
	console.log("Right Entities Reduced by Root:", rightEntitiesReducedByRoot);
	return sumRootValues(
		leftEntitiesReducedByRoot,
		rightEntitiesReducedByRoot,
		rootOperation,
	);
};

evaluate(left, "add", right);
const eggs = evaluate(left, "add", right);
console.log("eggs:", eggs);

// evaluate(left, "add", right) === -467.0083333333333;
