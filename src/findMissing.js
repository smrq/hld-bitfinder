module.exports = function findMissing(has, all) {
	var result = [];
	for (var key in all) {
		if (!Object.hasOwnProperty.call(all, key)) continue;
		if (has.indexOf(key) === -1) {
			result.push(all[key]);
		}
	}
	return result;
}
