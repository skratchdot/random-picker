/*
 * random-picker
 * https://github.com/skratchdot/random-picker
 *
 * Copyright (c) 2014 skratchdot
 * Licensed under the MIT license.
 */
/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/
'use strict';

var Picker = require('../lib/random-picker.js').Picker;
var picker, pickerSeeded;
var seed = 'My random seed value!!!!';
var iterations = 1000;

exports['random-picker tests'] = {
setUp: function (done) {
		picker = new Picker();
		pickerSeeded = new Picker(seed);
		done();
	},
	'simple test': function (test) {
		var i;
		test.expect(iterations * 2);
		picker.option('male');
		picker.option('female');
		for (i = 0; i < iterations; i++) {
			test.ok(['male','female'].indexOf(picker.pick()) >= 0, 'should be male or female.');
		}
		picker.remove('female');
		for (i = 0; i < iterations; i++) {
			test.ok(picker.pick() === 'male', 'should be male.');
		}
		test.done();
	},
	'no options': function (test) {
		test.expect(1);
		test.equal(picker.pick(), null, 'should be null');
		test.done();
	},
	'seeded picker': function (test) {
		test.expect(6);
		pickerSeeded.option('male');
		pickerSeeded.option('female');
		test.equal(pickerSeeded.pick(), 'female', 'should always be female.');
		test.equal(pickerSeeded.pick(), 'female', 'should always be female.');
		test.equal(pickerSeeded.pick(), 'male', 'should always be male.');
		test.equal(pickerSeeded.pick(), 'male', 'should always be male.');
		test.equal(pickerSeeded.pick(), 'female', 'should always be female.');
		test.equal(pickerSeeded.pick(), 'male', 'should always be male.');
		test.done();
	},
	'removeAll()': function (test) {
		test.expect(2);
		picker.option('male');
		picker.option('female');
		test.ok(['male','female'].indexOf(picker.pick()) >= 0, 'should be male or female.');
		picker.removeAll();
		test.equal(picker.pick(), null, 'should be null.');
		test.done();
	},
	'size(), totalScore(), avgScore()': function (test) {
		test.expect(6);
		picker.option('male');
		picker.option('female');
		test.equal(picker.size(), 2);
		test.equal(picker.totalScore(), 2);
		test.equal(picker.avgScore(), 1);
		picker.option('male', 4);
		picker.option('female', 4);
		picker.option('uknown', 7);
		test.equal(picker.size(), 3);
		test.equal(picker.totalScore(), 15);
		test.equal(picker.avgScore(), 5);
		test.done();
	}
};
