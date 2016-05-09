'use strict';

var gearbitData = require('./gearbit-data');
var keyData = require('./key-data');
var parseSave = require('./parseSave');
var findMissing = require('./findMissing');

var textarea = document.getElementById('save-input');
var outputDiv = document.getElementById('save-output');
var emptyOutput = outputDiv.innerHTML;

textarea.addEventListener('input', handleInput);

function handleInput() {
	try {
		var saveContents = textarea.value;
		if (saveContents === '') {
			writeEmpty();
			return;
		}
		var saveData = parseSave(saveContents);
		var missingGearbits = findMissing(saveData.cl['0'] || [], gearbitData);
		var missingKeys = findMissing(saveData.cl['2'] || [], keyData);
		var deaths = saveData.charDeaths;
		writeOutput(missingGearbits, missingKeys, deaths);
	} catch (err) {
		writeError(err);
	}
}

function writeError(err) {
	outputDiv.innerHTML = '<div class="alert alert-danger" role="alert"><strong>Something went wrong!</strong> Did you paste the right thing?</div>'
}

function writeOutput(missingGearbits, missingKeys, deaths) {
	var html = '<div>';

	if (missingKeys.length) {
		html += '<h3>Missing ' + missingKeys.length + ' keys</h3>';
		html += '<ul>';
		missingKeys.forEach(function (item) {
			html += '<li>' + item + '</li>';
		});
		html += '</ul>';
	} else {
		html += '<h3>All keys found!</h3>';
	}

	if (missingGearbits.length) {
		html += '<h3>Missing ' + missingGearbits.length + ' gearbits</h3>';
		html += '<ul>';
		missingGearbits.forEach(function (item) {
			html += '<li>' + item + '</li>';
		});
		html += '</ul>';
	} else {
		html += '<h3>All gearbits found!</h3>';
	}

	html += '<p>Also, you\'ve died ' + deaths + ' times.</p>';

	html += '</div>';

	outputDiv.innerHTML = html;
}

function writeEmpty() {
	outputDiv.innerHTML = emptyOutput;
}
