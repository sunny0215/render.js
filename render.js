const gretting = 'My name is ${name}, age is ${age}, i am a ${job.jobName}';

const employee = {
	name: 'XiaoMing',
	age: 11,
	job: {
		jobName: 'designer',
		level: 'senior'
	}
};

String.prototype.render = function(object) {
	const str = this;

	// 正则找到所有匹配项
	return str.replace(/\$\{([^\}]+)\}/g, function($1, $2) {
		// 要求不会大于2层，使用数组，可以处理大于2层，拓展性更好
		const matches = $2.split('.');
		var target = object;
		for (var i = 0; i < matches.length; i++) {
			// 每一层都要判断是否存在
			target = target[matches[i]];
			if (target === undefined) {
				console.warn($2 + ' can not found');
				break;
			}
		}
		// 防止匹配到的不是字符串或者数字，比如function or object
		if (typeof target === 'string' || typeof target === 'number') {
			return target;
		}
		console.warn($2 + ' is not string or number');
		return $1;
	});
};

const result = gretting.render(employee);
console.log(result);