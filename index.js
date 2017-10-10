/*
 * random-picker
 * https://github.com/skratchdot/random-picker
 *
 * Copyright (c) 2014 skratchdot
 * Licensed under the MIT license.
 */
'use strict';

var randomGenerator = require('random-seed');

var cleanScore = function (score) {
	var num = score === undefined ? 1 : parseFloat(score);
	num = isNaN(num) ? 1 : num;
	if (!Number.isFinite(num) || num < 0) {
		num = 0;
	}
	return num;
};

var Option = function (value, score) {
	this.value = value;
	this.score = cleanScore(score);
};

var Picker = function (seed) {
	var api = this;
	var rand = randomGenerator.create(seed);
	var total = 0;
	var options = [];

	var recalculateTotal = function () {
		total = 0;
		for (var i = 0; i < options.length; i++) {
			total += options[i].score;
		}
	};

	api.pick = function () {
		var runningTotal = 0;
		var randomValue = rand.floatBetween(0, total);
		for (var i = 0; i < options.length; i++) {
			runningTotal += options[i].score;
			if (randomValue < runningTotal) {
				return options[i].value;
			}
		}
		return null;
	};

	api.option = function (value, score) {
		var option = new Option(value, score);
		var added = false;
		if (option.score <= 0) {
			api.remove(value);
		} else {
			for (var i = 0; i < options.length; i++) {
				if (options[i].value === option.value) {
					options[i] = option;
					added = true;
				}
			}
			if (!added) {
				options.push(option);
			}
			recalculateTotal();
		}
	};

	api.removeAll = function () {
		total = 0;
		options = [];
	};

	api.remove = function (value) {
		for (var i = options.length - 1; i >= 0; i--) {
			if (options[i].value === value) {
				options.splice(i, 1);
			}
		}
		recalculateTotal();
	};

	api.size = function () {
		return options.length;
	};

	api.totalScore = function () {
		return total;
	};

	api.avgScore = function () {
		var avg = total / options.length;
		return Number.isFinite(avg) ? avg : 0;
	};

	return api;
};

exports.Picker = function (seed) {
	return new Picker(seed);
};
