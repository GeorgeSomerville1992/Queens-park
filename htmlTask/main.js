const buttons = document.getElementsByTagName("button");
const boxes = document.getElementsByClassName("box");

const arr = Array.prototype.map.call(boxes, (box) => box.innerHTML);

buttons[0].onclick = function () {
	arr.push(arr.shift());
	Array.prototype.forEach.call(boxes, (box, ind) => (box.innerHTML = arr[ind]));
};

buttons[1].onclick = function () {
	arr.unshift(arr.pop());
	Array.prototype.forEach.call(boxes, (box, ind) => (box.innerHTML = arr[ind]));
};
