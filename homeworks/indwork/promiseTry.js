function SayHellow(message, delay = 100) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Async ' + message);
			resolve(message);
		}, delay);
	})
}

SayHellow('Hello!')
	.then((message) => {
		console.log(message);
		return SayHellow("My name is ");
	})
	.then((message) => {
		console.log(message);
		return SayHellow('Vasya!');
	})
	.then((message) => {
		console.log(message);
	});