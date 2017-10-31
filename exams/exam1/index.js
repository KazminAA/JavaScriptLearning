function getFriendlyNumbers(start, end) {
	if ((end < start) || (start < 0) || (typeof(start) !== 'number') || (typeof (end) !== 'number')) return false;
	let result = [];
	for (let i = start; i <= end; i++) {
		let num1 = _getSumOfDividers(i);
		let num2 = _getSumOfDividers(num1);
		if ((num2 === i) && (num1 !== i) && (num2 > num1) && (num1 > start)) {
			result.push([num1, num2]);
		}
	}
	return result;
}

function _getSumOfDividers(num) { //return sum dividers of num
	let sum = 1, end = Math.sqrt(num);
	for (let i = 2; i <= end; i++) {
		if (num % i === 0) {
			sum += i;
			if (i !== num / i) sum += num / i;
		}
	}
	return sum;
}

module.exports = {
	firstName: 'Alexandr',
	secondName: 'Kazmin',
	task: getFriendlyNumbers
}