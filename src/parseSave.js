'use strict';

module.exports = function parseSave(contents) {
	var base64buf = new Buffer(contents, 'base64');
	var jsonStrWithJunk = base64buf.toString();
	var jsonStr = jsonStrWithJunk
		.slice(jsonStrWithJunk.indexOf('{ '))
		.slice(0, -1);
	var saveData = JSON.parse(jsonStr);

	for (var key in saveData) {
		if (!Object.hasOwnProperty.call(saveData, key)) continue;
		saveData[key] = parseValue(saveData[key]);
	}

	return saveData;
}

function parseValue(value) {
	if (/>$/.test(value)) {
		return parseObjValue(value);
	} else if (/\+$/.test(value)) {
		return parseArrValue(value, '+');
	} else if (/&$/.test(value)) {
		return parseArrValue(value, '&');
	} else {
		return value;
	}
}

function parseObjValue(value) {
	var split = value.split('>').slice(0, -1);
	var result = {};
	split.forEach(function (segment) {
		var match = /(.+)=(.+)/.exec(segment);
		var key = match[1];
		var value = parseValue(match[2]);
		result[key] = value;
	});
	return result;
}

function parseArrValue(value, delim) {
	return value.split(delim).slice(0, -1);
}
