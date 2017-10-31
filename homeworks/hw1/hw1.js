function fibonachiRec(n) {
	if ((n == 1) || (n == 2)) return 1;
	return fibonachiRec(n - 1) + fibonachiRec(n - 2);
}

function fibonachiLoop(n) {
	let f1 = 1, f2 = 1;
	let sum = 1;
	for (let i = n - 2; i > 0; i--) {
		sum = f1 + f2;
		f1 = f2;
		f2 = sum;
	}
	return sum;
}

function factorialRec(n) {
	return n == 1 ? 1 : n * factorialRec(n - 1);
}

function factorialLoop(n) {
	let result = 1;
	while (n != 1) {
		result *= n--;
	}
	return result;
}

function gcd(x, y) {
	return y == 0 ? x : gcd(y, x % y)
}

function lcd(x, y) {
	return x * y / gcd(x, y);
}

function findNotMatching(arr1, arr2) {
	if (!Array.isArray(arr1) || !Array.isArray(arr2)) throw 'IllegalArgumentException';
	let result = [];
	f2:    for (let i = 0; i < arr1.length; i++) {
		for (let j = 0; j < arr2.length; j++) {
			if (arr2[j] == arr1[i]) continue f2;
		}
		result.push(arr1[i]);
	}
	return result;
}